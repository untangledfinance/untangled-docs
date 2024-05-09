// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Untangled Protocol Documentation",
  tagline: "Institutional-grade RWA credit investment on-chain",
  favicon: "img/small_logo.png",

  // Set the production url of your site here
  url: "https://app.untangled.finance",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "", // Usually your GitHub org/user name.
  projectName: "", // Usually your repo name.

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Untangled",
        logo: {
          alt: "Untangled",
          src: "img/small_logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "userDoc",
            position: "left",
            label: "User Documentation",
          },
          {
            type: "docSidebar",
            sidebarId: "devDoc",
            position: "left",
            label: "Developer Documentation",
          },
          {
            href: "https://github.com/untangledfinance",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Documentation",
                to: "/docs/user-documentation/welcome-to-untangled",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Website",
                href: "https://untangled.finance/",
              },
              {
                label: "Forum",
                href: "https://forum.untangled.finance/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/UntangledFin",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/untangledfinance",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Untangled Foundation`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
