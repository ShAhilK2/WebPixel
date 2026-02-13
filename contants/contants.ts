const SCRIPT_URL = `${process.env.NEXT_PUBLIC_APP_URL}/js/webpixel.js`;

export const getScript = (domain: string, siteId: string) => {
  return `<script src="${SCRIPT_URL}" data-domain="${domain}" data-site-id="${siteId} defer"></script>`;
};
