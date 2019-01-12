export default [
  {
    path: '/',
    component: () => import('$router/home'),
    name: 'home',
  },
  {
    path: '/login',
    component: () => import('$router/login'),
    name: 'login',
  },
  {
    path: '/article-details',
    component: () => import('$router/article-details'),
    name: 'article-details',
  },
  {
    path: '/write-articles',
    component: () => import('$router/write-articles'),
    name: 'write-articles',
  },
]
