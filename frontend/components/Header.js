import { getUserInfo } from '../localStorage';

export const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    return `
    <div class="brand">
          <a href="/#/">jsamazona</a>
        </div>
        <div>
          ${name ? `<a href="/#/profile">${name}</a>`
    : '<a href="/#/signin">Sign-in</a> '}
          <a href="/#/cart">Cart</a>
          ${isAdmin ? '<a href="/#/dashboard">Dashboard</a>' : ''}
        </div>
    `; 
  },
  after_render: () => {}
};