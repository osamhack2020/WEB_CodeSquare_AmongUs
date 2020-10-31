module.exports = {
  docs: [
    {
      type: 'category',
      label: 'CodeSquare',
      items: ['introduction'],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation'],
    }
  ],
  api: [
    {
      type: 'category',
      label: 'Backend API',
      items: ['api/backend/user', 'api/backend/qna', 'api/backend/vm'],
    },
    {
      type: 'category',
      label: 'OpenStack API',
      items: ['api/openstack-api'],
    },
  ]
};
