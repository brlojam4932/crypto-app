import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

var formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const Button = styled.button`
  margin: 30px 9px;
  `;


function AccountBalance(props) {

  let content = "\u00A0"; // place holder so page does not "jump"
  if (props.showBalance) {
    content = <>{formatter.format(props.amount)}</>
  }
 
  return (
    <>
      <div>
        <h2>{content}</h2>
        <button type="button" class="btn btn-outline-primary"
          onClick={props.handleShow}
        >
          {props.showBalance ? "Hide Balance" : "Show Balance"}
        </button>

        <button type="button" class="btn btn-outline-secondary"
          //we print a callback function
          onClick={props.handlePrint}
        >
          Add Funds
        </button>
      </div>

    </>

  )
}

AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
}

export default AccountBalance;
