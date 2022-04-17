import CheckoutSteps from '../components/CheckoutSteps.js';
import { getUserInfo, setPayment } from '../localStorage.js';

const PaymentScreen = {
  after_render: () => {
    document.getElementById('payment-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        setPayment({ paymentMethod });
        document.location.hash = '/placeorder';
      });
  },
  render: () => {
    const { name } = getUserInfo();
    if (!name) {
      document.location.hash = '/';
    }
    return `
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
    <div class="form-container">
      <form id="payment-form">
         <ul class="form-items flex-row">
          <li>
            <h1>Payment</h1>
          </li>
          <li>
            <input type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
            <label for="paypal">Paypal</label>
          </li>
          <li>
            <input type="radio" name="payment-method" id="credit-card" value="Credit Card"/>
            <label for="credit-card">Credit Card</label>
          </li>
          <li>
            <input type="radio" name="payment-method" id="stripe" value="Stripe"/>
            <label for="stripe">Stripe</label>
          </li>
           <li>
            <button type="submit" class="primary">Continue</button>
          </li>     
         </ul>
      </form>
    </div>
    `; 
  }
};
export default PaymentScreen;