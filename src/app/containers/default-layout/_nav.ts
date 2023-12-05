import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/home',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Alunos',
    url: '/student',
    iconComponent: { name: 'cil-weightlifitng' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Grade',
    url: '/schedule',
    iconComponent: { name: 'cil-calendar' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
 
  {
    name: 'Gerencia',
    url: '/manager',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Contratos',
        url: '/contracts'
      },
      {
        name: 'Produtos',
        url: '/products'
      },
      {
        name: 'Serviço',
        url: '/service'
      }
    ]

  },
  {
    name: 'Administrativo',
    url: '/adm',
    iconComponent: { name: 'cil-task' },
    children: [
      {
        name: 'Contratos',
        url: '/contracts'
      },
      {
        name: 'Produtos',
        url: '/products'
      },
      {
        name: 'Serviço',
        url: '/services'
      }
    ]
  },


  
];
