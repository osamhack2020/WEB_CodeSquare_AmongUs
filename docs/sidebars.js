module.exports = {
  docs: [
    {
      type: 'category',
      label: 'About CodeSquare',
      items: ['introduction'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['troubleshooting'],
    }
  ],
  api: [
    {
      type: 'category',
      label: 'Backend REST API',
      items: [
        {
          User: [
            'api/backend/user/user-api-intro',
            'api/backend/user/sign-up',
            'api/backend/user/sign-in',
            'api/backend/user/sign-out',
            'api/backend/user/detail',
            'api/backend/user/refresh-token',
            'api/backend/user/authorized'
          ],
        },
        'api/backend/qna', 
        'api/backend/vm', 'api/backend/magazine'
      ]
    },
    {
      type: 'category',
      label: 'OpenStack API',
      items: ['api/openstack-api'],
    },
  ]
};
