# Premium templates (placeholder)

This folder documents how premium templates will be delivered and installed.

Purpose
-------
Premium templates provide advanced, paid features (for example, enterprise RBAC, advanced analytics, or hosted integrations). This folder contains marketing and installation guidance for buyers and maintainers.

How purchase & delivery will work (recommended)
---------------------------------------------
1. List the premium template in GitHub Marketplace or sell via your site.  
2. After purchase, provide access to a private GitHub release or private repository containing the premium template ZIP.  
3. Buyers run a simple installer (see `scripts/install_premium.sh`) which downloads the ZIP and installs it under `templates/`.

Installer behavior (safe by default)
----------------------------------
- The installer is deliberately non-destructive: it will not overwrite existing templates unless you explicitly confirm.  
- The public repo contains only installer instructions and helper scripts — no secret keys or enforcement code.  
- Any hosted services requiring keys should be documented and use secure, opt-in configuration (not embedded in the template).

Manual install (example)
------------------------
1. Download the paid template ZIP from the private release.  
2. Unzip into `templates/premium-<name>` in this repo.  
3. Run the generator to instantiate the template:  
   ```bash
   ./scripts/generate_feature.sh premium-<name> examples/my-premium-feature
   ```

Support & contact
-----------------
For questions about premium templates, billing, or delivery, contact the maintainer or the billing/support address listed on the Marketplace listing.

Notes for maintainers
---------------------
- Keep the public `MONETIZATION.md` and `premium/README.md` up to date with purchase and delivery instructions.  
- Avoid including enforcement code in the open-source templates — prefer gated delivery for premium artifacts.
