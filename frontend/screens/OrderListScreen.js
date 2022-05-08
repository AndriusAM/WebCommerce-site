import DashboardMenu from '../components/DashboardMenu';
import { deleteOrder, getOrders } from '../api';
import {
  hideLoading, rerender, showLoading, showMessage 
} from '../utils';

const OrderListScreen = {
  after_render: async () => {    
    const editButtons = document.getElementsByClassName('edit-button');
    Array.from(editButtons).forEach((editButton) => {
      editButton.addEventListener('click', () => {
        document.location.hash = `/order/${editButton.id}`;
      });
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this order?')) {
          showLoading();
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(OrderListScreen); 
          }
          hideLoading();
        }
      });
    });
  },
  render: async () => {
    const orders = await getOrders();
    console.log(orders);
    return `
  <div class="dashboard">
      ${DashboardMenu.render({ selected: 'orders' })}
      <div class="dashboard-content">
        <h1>Orders</h1>
        
         <div class="order-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>USER</th>
                <th>PAID AT</th>
                <th>DELIVEVERED AT</th>
                <th class="tr-action">ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map((order) => `
              <tr>
                <td>${order._id}</td>
                <td>${order.createdAt}</td>
                <td>${order.totalPrice}</td>
                <td>${order.user.name}</td>
                <td>${order.paidAt || 'Waiting for payment'}</td>
                <td>${order.paidAt ? order.deliveredAt || 'Not delivered' : 'Waiting for payment'}</td>
                <td>
                  <button id="${order._id}" class="edit-button">Edit</button>
                  <button id="${order._id}" class="delete-button">Delete</button>
                </td>
              </tr>
              `).join('\n')}
            </tbody>
          </table>
         </div>
     </div>
  `; 
  }
};

export default OrderListScreen;