import React, { Component } from "react";

import firebase from "../../config/firebase";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    async componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const db = firebase.firestore();
        db.collection("orders")
            .get()
            .then(querySnapshot => {
                const items = [];
                querySnapshot.forEach(doc => {
                    console.log(doc.id);
                    items.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                this.setState({ orders: items, loading: false });
            });
    };

    render() {
        let orders = this.state.orders.map(order => (
            <Order order={order} key={order.id} />
        ));

        if (this.state.loading) {
            orders = <Spinner />;
        }

        return <div>{orders}</div>;
    }
}

export default Orders;
