export const getBase = () => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/necTeam-official')) {
    return '/necTeam-official/';
  }
  if (typeof process !== 'undefined' && process.env?.GITHUB_PAGES) {
    return '/necTeam-official/';
  }
  if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL;
  }
  return '/';
};

export const asset = (path) => {
  const base = getBase();
  const clean = path.replace(/^\/+/, '');
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};

export const site = {
  app: 'NEC TEAM',
  company: 'NEONECY',
  developer: 'MD. ABDUL HAMIM',
  developerRole: 'LEAD FLUTTER DEVELOPER',
  email: 'bingi.startup@gmail.com',
  website: 'https://neonecy.com/',
  githubRepo: 'https://github.com/HamimNEO/necTeam-official',
  githubPages: 'https://hamimneo.github.io/necTeam-official/',
  updated: 'October 8, 2026',
  version: '1.0.2',
  get logo() {
    return asset('assets/app-icon.png');
  },
};
