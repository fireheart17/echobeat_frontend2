// Subscription.jsx

import React, { useState, useEffect } from 'react';
import './Subscription.css';
import Cookies from 'js-cookie';

const Subscription = () => {
    const handleSubscriptionPurchase = async (subscriptionId) => {
        try {
            const response = await fetch(`http://localhost:8081/api/users/update-subscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ subscription_id: subscriptionId })
            });
            
            if (response.ok) {
                alert("Subscription updated successfully!");
            } else {
                alert("Failed to update subscription");
            }
        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    };

    const [freePerks, setFreePerks] = useState([]);
    const [premiumPerks, setPremiumPerks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch perks based on subscriptionId
    const fetchPerks = async (subscriptionId, setPerks) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/perks/get/${subscriptionId}`);
            if (response.ok) {
                const data = await response.json();
                setPerks(data);
            } else {
                console.error(`No perks found for subscriptionId: ${subscriptionId}`);
            }
        } catch (error) {
            console.error("Error fetching perks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Fetch perks for Free Tier (id: 1) and Premium Tier (id: 2)
        fetchPerks(1, setFreePerks);
        fetchPerks(2, setPremiumPerks);
    }, []);

    return (
        <div className="subscription-container">
            <h1>Choose Your Plan</h1>
            <p>Experience the best music tailored just for you.</p>

            <div className="subscription-cards">
                {/* Free Tier Card */}
                <div className="subscription-card">
                    <h2>Free Tier</h2>
                    {isLoading ? (
                        <p>Loading perks...</p>
                    ) : (
                        <ul>
                            {freePerks.map((perk, index) => (
                                <li key={index}>{perk}</li>
                            ))}
                        </ul>
                    )}
                    <button className="buy-button" onClick={() => handleSubscriptionPurchase(1)}>
                        Select Free Tier
                    </button>
                </div>

                {/* Premium Tier Card */}
                <div className="subscription-card premium">
                    <h2>Premium Tier</h2>
                    {isLoading ? (
                        <p>Loading perks...</p>
                    ) : (
                        <ul>
                            {premiumPerks.map((perk, index) => (
                                <li key={index}>{perk}</li>
                            ))}
                        </ul>
                    )}
                    <button className="buy-button" onClick={() => handleSubscriptionPurchase(2)}>
                        Select Premium Tier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
