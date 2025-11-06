# CrimeNet Legal Section Advisor — Option 1 (Free) MVP Plan

Status: Draft for review
Owner: CrimeNet team
Target stack: Spring Boot backend (Render), React + Vite frontend (Firebase Hosting)
Model: law-ai/InLegalBERT (MIT) as an embedding model only

## 1. Summary
Build a free legal guidance assistant that suggests likely Indian penal sections based on a user’s narrative. No paid LLMs. Use InLegalBERT embeddings + cosine similarity to rank Bharatiya Nyaya Sanhita (BNS) sections (and show alternates) with citations and clarifying questions.

Why this works: InLegalBERT is pre-trained on Indian case law (MIT license). A small, curated index of BNS sections (few hundred entries) can be embedded once and matched on CPU with low latency and zero API cost.

## 2. Goals and Non‑Goals
- Goals
  - Given a free-text description (English, MVP), return:
    - Primary section(s) from BNS with confidence and short reasons
    - Alternate plausible sections
    - Direct citations of the section text
    - 2–4 clarifying questions to improve accuracy
  - Zero recurring costs (no paid LLM/API). Runs on Render free tier.
  - Clear disclaimer: informational aid, not legal advice.
- Non‑Goals (MVP)
  - Full multilingual support (can be a follow-up)
  - Complex reasoning or multi-turn legal advice
  - Automatic form filling or FIR drafting

## 3. User Flow (Frontend)
1) CTA on Home: “Get legal section guidance” → input textarea
2) User submits narrative
3) Show result card:
   - Primary section (BNS: number, title, one-line reason, confidence)
   - Alternates (2–4)
   - Citations (section snippets with links)
   - Clarifying questions (chips/buttons)
   - Disclaimer and “seek help” quick links

## 4. Legal Sources (Post‑2024 codes)
- Primary: Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), Bharatiya Sakshya Adhiniyam (BSA)
- Official text: IndiaCode / Gazette links (to be listed in the data README)
- Maintain IPC → BNS mapping for user familiarity (metadata field `formerIPC`).
- Update policy: refresh corpus when amendments occur; re-embed.

## 5. Data Model (Sections Corpus)
- Storage file: `backend/src/main/resources/bns/sections.json`
- One JSON object per section (flattened). Suggested schema:
```json
{
  "id": "bns-###",
  "act": "BNS",
  "chapter": "Chapter X: Of Offences against the Person",
  "sectionNumber": "###",
  "title": "Voluntarily causing grievous hurt",
  "text": "<authoritative section text>",
  "ingredients": ["voluntarily caused hurt", "hurt qualifies as grievous (fracture, etc.)"],
  "punishment": "<as per BNS>",
  "cognizable": true,
  "bailable": false,
  "compoundable": false,
  "aliases": ["grievous hurt", "serious injury"],
  "formerIPC": ["325", "326"],
  "notes": "Cross-reference to aggravated forms (weapon, dangerous means).",
  "lastUpdated": "2025-10-01"
}
```
- Keep 1 file for MVP. Later we can split by chapters or acts.

## 6. Embeddings
- Model: `law-ai/InLegalBERT` (MIT) — 768-dim encoder.
- Tokenization: same as LegalBERT (uncased). Use mean pooling over last hidden states (or CLS) — pick and keep consistent.
- Strategy:
  - Precompute and cache section embeddings at startup (few hundred → trivial).
  - Embed user input per request.
  - Cosine similarity; top-k (k=8), apply a minimum similarity threshold (tune e.g., ≥ 0.45).
- Version pinning: record model card SHA and tokenizer version in code.

## 7. Matching & Ranking
- Primary sort: cosine similarity descending.
- Tie-breakers/heuristics (optional, rule-based):
  - Boost sections with ingredient keywords matched in user text (e.g., "fracture", "weapon", "threat").
  - Penalize overly broad sections if a more specific aggravated form is in top‑k.
- Output: primary = rank 1 (post-heuristic), alternates = next 3–5.

## 8. Backend API (Spring Boot)
- Endpoint: `POST /api/legal/advise`
- Request (JSON):
```json
{
  "description": "I was beaten badly and hospitalized. Arm fracture.",
  "language": "en"
}
```
- Response (JSON):
```json
{
  "primary": {
    "act": "BNS",
    "sectionNumber": "###",
    "title": "Voluntarily causing grievous hurt",
    "confidence": 0.78,
    "reasons": [
      "Mentions hospitalization and fracture consistent with grievous hurt"
    ],
    "citation": {
      "snippet": "Whoever voluntarily causes grievous hurt...",
      "source": "BNS §###",
      "link": "https://indiacode.nic.in/...#section-###"
    }
  },
  "alternates": [
    {
      "act": "BNS",
      "sectionNumber": "###",
      "title": "Voluntarily causing hurt by dangerous weapons",
      "confidence": 0.64
    }
  ],
  "followUps": [
    "Was any weapon or dangerous means used?",
    "Do medical records indicate fracture or surgery?",
    "Were threats made before/after the assault?"
  ],
  "disclaimer": [
    "This is informational assistance, not legal advice.",
    "Please contact police or a licensed lawyer for formal guidance."
  ],
  "metadata": {
    "model": "law-ai/InLegalBERT",
    "embeddingPool": "mean",
    "indexVersion": "2025-10-01"
  }
}
```
- Errors:
  - 400 if `description` empty/too short
  - 500 on model/index errors

## 9. Clarifying Questions Logic
- Maintain a small bank keyed by concept clusters and triggers:
  - Hurt severity: hospital, fracture, stitches → ask for medical confirmation
  - Weapons: knife, rod, acid, firearm → ask about type of weapon
  - Intent/lethality: attempted murder cues → ask about intent and vital parts
  - Victim category: child, public servant, spouse → ask if special category applies
- Return the 2–4 most relevant questions based on top‑k matched sections and keywords.

## 10. Internationalization (Later)
- MVP: accept English narratives.
- Upgrade path 1 (still free): use multilingual embeddings (e.g., BGE‑M3) for direct Hindi/other inputs.
- Upgrade path 2: use Bhashini for on‑device/edge translation before embedding.

## 11. Security & Privacy
- Do not store user narratives by default. If analytics needed, store anonymized, redacted text with consent.
- No external API calls → PII doesn’t leave the server.
- Rate‑limit endpoint to avoid abuse (basic IP throttle).

## 12. Performance & Caching
- Index size: a few hundred sections × 768 floats ≈ < 1 MB in memory.
- Request latency (CPU): ~10–80 ms for embedding + ~1 ms matching (estimates; verify on Render free dyno).
- Warm‑up: embed a dummy string at startup to initialize the model.
- Optional: LRU cache of last 100 queries → embedding reuse if exact repeat.

## 13. Deployment Notes (Render Free Tier)
- Container/Process: Same backend. No GPU required.
- Startup: load corpus, compute embeddings, log indexVersion & section count.
- Health check: `/actuator/health` should report UP after index ready.

## 14. Evaluation Plan
- Prepare a 30–50‑case gold set with expected sections (BNS) + notes.
- Metrics: top‑1/top‑3 accuracy; citation correctness; survey perceived usefulness.
- Error analysis categories: under‑specified facts, multi‑section overlap, language mismatch.
- Iterate thresholds, heuristics, and question selection.

## 15. Acceptance Criteria (MVP)
- [ ] Endpoint `/api/legal/advise` returns structured JSON per spec
- [ ] For 70% of test narratives, top‑3 includes an expected section
- [ ] Response includes at least one accurate citation link for all results
- [ ] Clarifying questions rendered in UI; disclaimer visible
- [ ] No external API calls; app runs on Render free plan

## 16. Risks & Mitigations
- Law updates (BNS amendments): keep `indexVersion` and re‑embed on updates; automate sync.
- Ambiguity in narratives: ask clarifying questions; surface alternates.
- English‑only MVP: communicate limitation; plan multilingual follow‑up.
- Model drift/limitations: allow swapping embeddings model (BGE‑M3 etc.) behind an interface.

## 17. Roadmap & Effort (2 weeks)
- Week 1
  - Curate BNS corpus + IPC→BNS mapping; add metadata (cognizable/bailable/compoundable)
  - Implement embedding pipeline (InLegalBERT) and in‑memory index
  - Implement `/api/legal/advise` (rank, heuristics, questions) + unit tests
- Week 2
  - Add frontend card & result rendering on Home
  - Build 30–50 case gold set; evaluate; tune threshold/heuristics
  - Add logging, rate‑limit, and polish citations

## 18. Future Extensions
- Local LLM (Ollama) for reasoned summaries, still free
- RAG with statute retrieval + structured JSON answers
- Multilingual input via multilingual embeddings or translation
- Officer tooling: internal view to annotate corrections (active learning)

## 19. Implementation Details (Backend)
- Dependencies (Maven):
  - `ai.djl:api`
  - `ai.djl.pytorch:pytorch-engine` (or ONNXRuntime engine)
  - `ai.djl.huggingface:tokenizers`
  - Spring Web, Actuator
- Service outline:
  - `SectionRepository`: loads JSON → `List<Section>`
  - `EmbeddingService`: wraps tokenizer+model, provides `float[768] embed(String)`; mean pooling
  - `IndexService`: holds `List<SectionVector>`; cosine top‑k; threshold; small heuristics
  - `LegalAdviceService`: orchestrates embed → search → compose response → questions
  - `LegalAdviceController`: POST `/api/legal/advise`
- Data files:
  - `backend/src/main/resources/bns/sections.json` (authoritative text + metadata)
  - `backend/src/main/resources/bns/sources.md` (links to IndiaCode/Gazette)

## 20. Example Pseudocode
```java
@PostMapping("/api/legal/advise")
public ResponseEntity<AdviceResponse> advise(@RequestBody AdviceRequest req) {
  validate(req.description());
  float[] q = embeddingService.embed(normalize(req.description()));
  List<Match> topK = indexService.search(q, 8, 0.45f);
  AdviceResponse resp = adviceComposer.compose(topK, req.description());
  return ResponseEntity.ok(resp);
}
```

## 21. Disclaimers (UI copy)
- “This tool provides informational guidance only and is not a substitute for professional legal advice.”
- “For emergencies, contact the police immediately.”
- “Law references are based on BNS/BNSS/BSA as last updated on <date>.”

## 22. References
- InLegalBERT: https://huggingface.co/law-ai/InLegalBERT (MIT)
- HF legal models search: https://huggingface.co/models?search=india+legal
- Note on 2024–2025 law changes (BNS/BNSS/BSA replacing IPC/CrPC/Evidence)

---

Appendix A — Example Section JSON
```json
{
  "id": "bns-xyz",
  "act": "BNS",
  "chapter": "Offences against the human body",
  "sectionNumber": "XYZ",
  "title": "Voluntarily causing grievous hurt",
  "text": "... authoritative text ...",
  "ingredients": ["voluntarily caused hurt", "grievous injury (e.g., fracture)"],
  "punishment": "...",
  "cognizable": true,
  "bailable": false,
  "compoundable": false,
  "aliases": ["grievous hurt", "serious injury"],
  "formerIPC": ["325", "326"],
  "notes": "Aggravated forms if weapon/dangerous means used.",
  "lastUpdated": "2025-10-01"
}
```

Appendix B — Example Request/Response
```json
POST /api/legal/advise
{
  "description": "A person beat me badly; I was hospitalized and had a fracture."
}
```
```json
200 OK
{
  "primary": {
    "act": "BNS",
    "sectionNumber": "XYZ",
    "title": "Voluntarily causing grievous hurt",
    "confidence": 0.78,
    "reasons": ["Mentions hospitalization and fracture consistent with grievous hurt"],
    "citation": {"snippet": "...", "source": "BNS §XYZ", "link": "https://..."}
  },
  "alternates": [
    {"act": "BNS", "sectionNumber": "ABC", "title": "Voluntarily causing hurt by dangerous weapons", "confidence": 0.64}
  ],
  "followUps": ["Was any weapon used?", "Any surgery or multiple fractures?"],
  "disclaimer": ["This is informational assistance, not legal advice."]
}
```
