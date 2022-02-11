import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./components/store/ui-slice";
import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data",
        })
      );
      const response = await fetch(
        "https://react-app-81b61-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Succes",
          message: "Sent cart data succesfully!",
        })
      );

      const responseData = await response.json();
    };
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.status}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

// const newTotalQuantity = cart.totalQuantity + 1;

//     const updatedItems = cart.items.slice();
//     const existingItem = updatedItems.find((item) => item.id === cart.id);

//     if (existingItem) {
//       const updatedItem = { ...existingItem };
//       updatedItem.quantity++;
//       updatedItem.price = updatedItem.price + price;
//       const existingItemIndex = updatedItems.findIndex(
//         (item) => item.id === id
//       );
//       updatedItems[existingItemIndex] = updatedItem;
//     } else {
//       updatedItems.push({
//         id: id,
//         price: price,
//         quantity: 1,
//         totalPrice: price,
//         name: title,
//       });
//     }

//     const newCart = {
//       totalQuantity: newTotalQuantity,
//       items: updatedItems,
//     };

//     dispatch(cartActions.replaceCart(newCart));
