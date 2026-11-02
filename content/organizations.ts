/**
 * Organizations shown in the logo marquee on the home page.
 *
 * THESE ARE SAMPLE ENTRIES, NOT REAL CLIENTS. They must be replaced with real
 * organizations, with permission to use their names and logos, before going live.
 * While any entry has `sample: true` the section shows a "Sample data" label.
 *
 * To change the list, edit this array: nothing else needs touching. Put a logo file
 * in `public/logos/` (SVG preferred, dark marks in a white version) and point `logo`
 * at it. For a real client, remove `sample: true`, or leave the field out.
 *
 * `detail` is what the screen shows when someone points at a logo. The CVE-style text
 * below is invented and is not a real vulnerability. It must never be attached to a
 * real entry, and a unit test fails the build's checks if it is.
 */
export type Organization = {
  name: string;
  /** Path under `public/`, starting with /logos/. */
  logo: string;
  /** True for placeholder entries that are not real clients. */
  sample?: boolean;
  /** Text for the screen that opens on hover, focus or tap. Leave out for no screen. */
  detail?: string;
};

const SAMPLE_DETAIL = "Sample CVE:463837/2024";

export const organizations: Organization[] = [
  { name: "Apple", logo: "/logos/apple.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Microsoft", logo: "/logos/microsoft.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "YouTube", logo: "/logos/youtube.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Google", logo: "/logos/google.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Amazon", logo: "/logos/amazon.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Meta", logo: "/logos/meta.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Netflix", logo: "/logos/netflix.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Adobe", logo: "/logos/adobe.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Spotify", logo: "/logos/spotify.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Slack", logo: "/logos/slack.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "Intel", logo: "/logos/intel.svg", sample: true, detail: SAMPLE_DETAIL },
  { name: "LinkedIn", logo: "/logos/linkedin.svg", sample: true, detail: SAMPLE_DETAIL },
];
