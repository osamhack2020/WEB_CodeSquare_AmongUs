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
            'api/backend/user/sign-up',
            'api/backend/user/sign-in',
            'api/backend/user/sign-out',
            'api/backend/user/user-detail',
            'api/backend/user/refresh-token',
          ],
          QnA: [
            'api/backend/qna/board',
            'api/backend/qna/boardcomment',
            'api/backend/qna/reply',
            'api/backend/qna/replycomment',
          ],
        },
        'api/backend/magazine/magazine',
        'api/backend/vm/vm',
      ]
    },
    {
      type: 'category',
      label: 'OpenStack API',
      items: ['api/openstack-api'],
    },
  ]
};
