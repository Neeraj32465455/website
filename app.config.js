// Static server configuration
const config = {
  port: process.env.PORT || 3000,
  publicDir: '.',
  cleanUrls: true,
  directoryListing: false,
  rewrites: [
    // Handle policy pages
    { source: '/policies/terms', destination: '/policies/terms.html' },
    { source: '/policies/privacy', destination: '/policies/privacy.html' },
    { source: '/policies/refund', destination: '/policies/refund.html' },
    { source: '/policies/aup', destination: '/policies/aup.html' },
    // Handle main pages
    { source: '/auth', destination: '/auth.html' },
    { source: '/services', destination: '/services.html' },
    { source: '/contact', destination: '/contact.html' },
    { source: '/', destination: '/index.html' }
  ],
  headers: [
    {
      source: '**/*.@(jpg|jpeg|gif|png|svg)',
      headers: [{
        key: 'Cache-Control',
        value: 'max-age=7200'
      }]
    }
  ]
};

export default config;