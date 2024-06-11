export default function addHttpsIfNotPresent(url: string): string {
  if (!url.startsWith("https://")) {
      url = "https://" + url;
  }
  return url;
}