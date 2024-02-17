/** @odoo-module **/
import { Dialog } from "@web/core/dialog/dialog";
import { _t } from "@web/core/l10n/translation";
import { jsonrpc, RPCError } from "@web/core/network/rpc_service";
export default {
    /**
     * Simulate a feedback from a payment provider and redirect the customer to the provider official page.
     *
     * @private
     * @param {object} processingValues - The processing values of the transaction.
     * @return {void}
     */
    async processSaferPayPayment(processingValues) {
        const customerInput = document.getElementById('customer_input').value;
        const simulatedPaymentState = document.getElementById('simulated_payment_state').value;
        console.log('f1',simulatedPaymentState)
        jsonrpc('/saferpay/payment', {
            'reference': processingValues.reference,
            'payment_details': customerInput,
            'simulated_state': simulatedPaymentState,
        }).then((result) => {
            window.location = result;
        }).catch(error => {
            if (error instanceof RPCError) {
                this._displayErrorDialog(_t("Payment processing failed"), error.data.message);
                this._enableButton?.(); // This method doesn't exists in Express Checkout form.
            } else {
                return Promise.reject(error);
        }
    })

}
}
