# VNS DIGITAL deployment notes

The public website source is in `vnsdigital-site/`.

## Publish the website

1. Download this repository as a ZIP from GitHub and extract it.
2. Open the extracted `vnsdigital-site` folder.
3. In Cloudflare, open **Workers & Pages** and select the existing **vns-digital** Pages project.
4. Choose **Create new deployment** and upload the contents of `vnsdigital-site` (the folder containing `index.html`, not the entire repository).
5. Deploy to production. The public address is `https://vns-digital.pages.dev`.

This Pages project was created for Direct Upload. Cloudflare does not allow changing an existing Direct Upload project into a Git-integrated project later. To enable automatic deployments from GitHub instead, create a separate Git-integrated Pages project after the Cloudflare GitHub app installation is repaired.

## Lead form backend

The contact form posts to the Cloudflare Worker:

`https://vns-digital-api.vnsdigital-rome.workers.dev/api/leads`

The Worker stores enquiries in the EU-jurisdiction D1 database `vnsdigital-leads`. The Worker CORS allow-list is restricted to `https://vns-digital.pages.dev`.

## Important scope notes

- The workflow explorer is an interactive example preview. It does not connect to a visitor's apps or call a generative AI model.
- Live customer automations require integrations, authorization, testing, monitoring and agreed usage limits.
- Review the privacy notice and business/legal details before collecting enquiries at scale.
