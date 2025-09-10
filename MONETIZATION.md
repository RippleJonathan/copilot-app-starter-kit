# Monetization & Premium Templates (notes)

Purpose
-------
This document captures a lightweight, non-destructive plan to offer paid "premium" templates or add-ons alongside the open-source starter kit.

Principles
----------
- Keep core starter kit open-source (MIT).  
- Offer advanced templates or hosted features as commercial add-ons.  
- Do not include brittle enforcement in the open-source code. Prefer gated delivery (private repo, GitHub Marketplace, or paid release).
- Be transparent about what's free vs premium and provide trial or limited variants where useful.

Where to sell
-------------
- GitHub Marketplace (recommended): native billing, discoverability, and install flow.  
- Alternative: sell via your site (Stripe) and deliver via private GitHub releases or install scripts.

Delivery & gating patterns
-------------------------
- Private repo or private release (ZIP) for paid templates.  
- Provide a small installer script or instructions in the public repo that guides buyers to the private release. Do not require secrets to build or run local tests.  
- Offer a "lite" free template in `/templates` for trial and a full premium version behind the purchase.

Agent UX (Copilot messages)
--------------------------
- Add soft upsell language to `templates/prompts.md` and `COPILOT_INSTRUCTIONS.md`. Example:
  - "This advanced template is premium. Would you like purchase/install instructions?"
- The agent should never silently fail or block work when a user requests a premium template. Always offer alternatives or trial options.

Telemetry & privacy
-------------------
- Any telemetry or usage tracking must be opt-in and disclosed.  
- Keep telemetry minimal (e.g., template generation count) and store it securely.

Legal & billing
----------------
- Document license differences clearly: MIT for core, commercial license linked for premium templates.  
- Prepare basic purchase terms and a refund/usage policy before listing a paid product.

Quick checklist to ship a premium template
-----------------------------------------
1. Decide hosting: Marketplace or private release.  
2. Create premium template repo or release and mark it private/unlisted.  
3. Add marketing copy, demo, and a short video or GIF in `examples/`.  
4. Add clear purchase/install instructions in the public `premium/README.md` (or this file).  
5. Add opt-in telemetry (optional) and privacy text.  
6. Publish and monitor adoption, iterate on messaging.

Next steps
----------
- I can scaffold a `premium/` folder with a `README.md` and soft-locked example, plus update the prompt library for upsell messages.  
- Or I can prepare a GitHub Marketplace checklist and copy for the listing.  
