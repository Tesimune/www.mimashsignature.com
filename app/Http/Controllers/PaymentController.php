<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Paystack;

class PaymentController extends Controller
{

    /**
     * Redirect the User to Paystack Payment Page
     * @return Url
     */
    public function redirectToGateway()
    {
        try {
            /**
             *  In the case where you need to pass the data from your 
             *  controller instead of a form
             *  Make sure to send:
             *  required: email, amount, reference, orderID(probably)
             *  optionally: currency, description, metadata
             *  e.g:
             *  
             */
            $data = array(
                "amount" => 700 * 100,
                "reference" => '4g4g5485g8545jg8gj',
                "email" => 'user@mail.com',
                "currency" => "NGN",
                "orderID" => 23456,
            );
            
            // dd($data);
            return Paystack::getAuthorizationUrl($data)->redirectNow();
            
        } catch (\Exception $e) {
            return Redirect::back()->withMessage(['msg' => 'The paystack token has expired. Please refresh the page and try again.', 'type' => 'error']);
        }
    }

    /**
     * Obtain Paystack payment information
     * @return void
     */
    public function handleGatewayCallback()
    {
        $paymentDetails = Paystack::getPaymentData();

        dd($paymentDetails);
        // Now you have the payment details,
        // you can store the authorization_code in your db to allow for recurrent subscriptions
        // you can then redirect or do whatever you want
    }
}
