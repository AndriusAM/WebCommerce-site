import DashboardMenu from '../components/DashboardMenu';

const DashboardScreen = {
  adter_render: () => {},
  render: () => `
     <div class="dashboard">
      ${DashboardMenu.render({ selected: 'dashboard' })}
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <div>
         Info and charts here.
         </div>
     </div>
    `,
};
export default DashboardScreen;