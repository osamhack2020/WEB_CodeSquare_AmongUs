module.exports = {
  title: 'CodeSquare',
  tagline: '군 복무중인 개발자를 위한 국방망용 통합 개발 플랫폼',
  url: 'https://docs.codesquare.space',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'osamhack2020', // Usually your GitHub org/user name.
  projectName: 'WEB_CodeSquare_AmongUs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'CodeSquare',
      logo: {
        alt: 'CodeSquare Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'introduction',
          label: 'Docs',
        },
        {
          type: 'doc',
          position: 'left',
          docId: 'api/backend/user/sign-up',
          label: 'API',
        },
        {
          href: 'https://github.com/osamhack2020/WEB_CodeSquare_AmongUs',
          label: 'GitHub',
          className: 'header-github-link',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/introduction',
            },
            {
              label: 'API',
              to: 'docs/api/backend/user/sign-up',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'OSAM',
              href: 'https://osam.kr/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/osamhack2020/WEB_CodeSquare_AmongUs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CodeSquare. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
