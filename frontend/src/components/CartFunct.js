import Cookies from 'js-cookie';

export default function CartFunct(props) {
  var message = "test";

  return (
    <div>
      {props.handleCallback(message)}
    </div>
  );
};