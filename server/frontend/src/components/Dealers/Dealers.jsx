import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
    const [dealersList, setDealersList] = useState([]);
    //let [state, setState] = useState("")
    let [states, setStates] = useState([])

    // let root_url = window.location.origin
    let dealer_url = 'https://naimawahbi92-3030.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/fetchDealers';

    let dealer_url_by_state = `https://naimawahbi92-3030.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/fetchDealers/`;

    const filterDealers = async (state) => {
        try {
            dealer_url_by_state = dealer_url_by_state + state;
            const res = await fetch(dealer_url_by_state, {
                method: "GET"
            });
            const data = await res.json();
            console.log("API Response:", data);  // Debugging log

            if (Array.isArray(data)) {
                const all_dealers = data;
                const unique_states = [...new Set(all_dealers.map(dealer => dealer.state))];
                setStates(unique_states);
                setDealersList(all_dealers);
            } else {
                console.error("API did not return an array:", data);
            }
        } catch (error) {
            console.error("Error fetching dealers:", error);
        }
    }

    const get_dealers = async () => {
        try {
            const res = await fetch(dealer_url, { method: "GET" });
            const data = await res.json();
            console.log("API Response:", data);  // Debugging log

            if (Array.isArray(data)) {
                const all_dealers = data;
                const unique_states = [...new Set(all_dealers.map(dealer => dealer.state))];
                setStates(unique_states);
                setDealersList(all_dealers);
            } else {
                console.error("API did not return an array:", data);
            }
        } catch (error) {
            console.error("Error fetching dealers:", error);
        }
    }
    useEffect(() => {
        get_dealers();
    }, []);


    let isLoggedIn = sessionStorage.getItem("username") != null ? true : false;
    return (
        <div>
            <Header />

            <table className='table'>
                <tr>
                    <th>ID</th>
                    <th>Dealer Name</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Zip</th>
                    <th>
                        <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
                            <option value="" selected disabled hidden>State</option>
                            <option value="All">All States</option>
                            {states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>

                    </th>
                    {isLoggedIn ? (
                        <th>Review Dealer</th>
                    ) : <></>
                    }
                </tr>
                {dealersList.map(dealer => (
                    <tr>
                        <td>{dealer['id']}</td>
                        <td><a href={'/dealer/' + dealer['id']}>{dealer['full_name']}</a></td>
                        <td>{dealer['city']}</td>
                        <td>{dealer['address']}</td>
                        <td>{dealer['zip']}</td>
                        <td>{dealer['state']}</td>
                        {isLoggedIn ? (
                            <td><a href={`/postreview/${dealer['id']}`}><img src={review_icon} className="review_icon" alt="Post Review" /></a></td>
                        ) : <></>
                        }
                    </tr>
                ))}
            </table>;
        </div>
    )
}

export default Dealers
