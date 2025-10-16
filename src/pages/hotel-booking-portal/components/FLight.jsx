import React, { useState } from 'react';

const FlightBooking = () => {
    const [formData, setFormData] = useState({
        flightType: 'roundtrip',
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        adults: 1,
        children: 0,
        infants: 0,
        mobileNo: ''
    });

    const cities = [
        'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai',
        'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Surat',
        'Himachal', 'Goa', 'Kerala', 'Uttrakhand'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNumberChange = (name, operation) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: operation === 'increment'
                ? prevState[name] + 1
                : Math.max(0, prevState[name] - 1)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Flight Booking Data:', formData);
        alert('Flight booking submitted successfully!');
    };

    const handleSwapCities = () => {
        setFormData(prevState => ({
            ...prevState,
            from: prevState.to,
            to: prevState.from
        }));
    };

    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '30px'
    };

    const headingStyle = {
        color: '#2c3e50',
        fontSize: '28px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        margin: 0
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
    };

    const flightTypeSectionStyle = {
        display: 'flex',
        justifyContent: 'center'
    };

    const radioGroupStyle = {
        display: 'flex',
        gap: '30px',
        background: '#f8f9fa',
        padding: '10px 20px',
        borderRadius: '25px'
    };

    const radioLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontWeight: '500',
        color: '#555'
    };

    const radioCustomStyle = (checked) => ({
        width: '18px',
        height: '18px',
        border: '2px solid #3498db',
        borderRadius: '50%',
        position: 'relative',
        backgroundColor: checked ? '#3498db' : 'transparent'
    });

    const citiesSectionStyle = {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '15px'
    };

    const inputGroupStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    };

    const labelStyle = {
        fontWeight: '600',
        marginBottom: '8px',
        color: '#2c3e50',
        fontSize: '14px'
    };

    const inputStyle = {
        padding: '12px 15px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease'
    };

    const swapButtonStyle = {
        background: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        marginBottom: '8px'
    };

    const datesSectionStyle = {
        display: 'flex',
        gap: '15px'
    };

    const passengersSectionStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const passengersControlsStyle = {
        display: 'flex',
        gap: '20px',
        background: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px'
    };

    const passengerTypeStyle = {
        flex: 1,
        textAlign: 'center'
    };

    const counterStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px'
    };

    const counterButtonStyle = {
        width: '35px',
        height: '35px',
        border: '2px solid #3498db',
        background: 'white',
        color: '#3498db',
        borderRadius: '50%',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    };

    const counterSpanStyle = {
        fontWeight: 'bold',
        fontSize: '18px',
        minWidth: '30px'
    };

    const mobileSectionStyle = {
        maxWidth: '300px'
    };

    const submitSectionStyle = {
        textAlign: 'center'
    };

    const submitButtonStyle = {
        background: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '15px 40px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '25px',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={headingStyle}>FLIGHT BOOKING</h1>
            </div>

            <form onSubmit={handleSubmit} style={formStyle}>
                {/* Flight Type */}
                <div style={flightTypeSectionStyle}>
                    <div style={radioGroupStyle}>
                        <label style={radioLabelStyle}>
                            <input
                                type="radio"
                                name="flightType"
                                value="oneway"
                                checked={formData.flightType === 'oneway'}
                                onChange={handleInputChange}
                                style={{ display: 'none' }}
                            />
                            <div style={radioCustomStyle(formData.flightType === 'oneway')}></div>
                            One Way
                        </label>
                        <label style={radioLabelStyle}>
                            <input
                                type="radio"
                                name="flightType"
                                value="roundtrip"
                                checked={formData.flightType === 'roundtrip'}
                                onChange={handleInputChange}
                                style={{ display: 'none' }}
                            />
                            <div style={radioCustomStyle(formData.flightType === 'roundtrip')}></div>
                            Round Trip
                        </label>
                    </div>
                </div>

                {/* Cities Selection */}
                <div style={citiesSectionStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>FROM</label>
                        <select
                            name="from"
                            value={formData.from}
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city} value={city.toLowerCase()}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        style={swapButtonStyle}
                        onClick={handleSwapCities}
                        onMouseOver={(e) => e.target.style.background = '#2980b9'}
                        onMouseOut={(e) => e.target.style.background = '#3498db'}
                    >
                        ⇄
                    </button>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>TO</label>
                        <select
                            name="to"
                            value={formData.to}
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city} value={city.toLowerCase()}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Dates Section */}
                <div style={datesSectionStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>DEPARTURE DATE</label>
                        <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                        />
                    </div>

                    {formData.flightType === 'roundtrip' && (
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>RETURN DATE</label>
                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleInputChange}
                                required
                                style={inputStyle}
                            />
                        </div>
                    )}
                </div>

                {/* Passengers Section */}
                <div style={passengersSectionStyle}>
                    <label style={labelStyle}>PASSENGERS</label>
                    <div style={passengersControlsStyle}>
                        <div style={passengerTypeStyle}>
                            <span style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#555', fontSize: '14px' }}>
                                ADULTS
                            </span>
                            <div style={counterStyle}>
                                <button
                                    type="button"
                                    onClick={() => handleNumberChange('adults', 'decrement')}
                                    style={counterButtonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#3498db';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#3498db';
                                    }}
                                >
                                    -
                                </button>
                                <span style={counterSpanStyle}>{formData.adults}</span>
                                <button
                                    type="button"
                                    onClick={() => handleNumberChange('adults', 'increment')}
                                    style={counterButtonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#3498db';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#3498db';
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div style={passengerTypeStyle}>
                            <span style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#555', fontSize: '14px' }}>
                                CHILDREN
                            </span>
                            <div style={counterStyle}>
                                <button
                                    type="button"
                                    onClick={() => handleNumberChange('children', 'decrement')}
                                    style={counterButtonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#3498db';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#3498db';
                                    }}
                                >
                                    -
                                </button>
                                <span style={counterSpanStyle}>{formData.children}</span>
                                <button
                                    type="button"
                                    onClick={() => handleNumberChange('children', 'increment')}
                                    style={counterButtonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#3498db';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#3498db';
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div style={passengerTypeStyle}>
                            <span style={{ display: 'block', fontWeight: '600', marginBottom: '10px', color: '#555', fontSize: '14px' }}>
                                INFANTS
                            </span>
                            <div style={counterStyle}>
                                <button
                                    type="button"
                                    onClick={() => handleNumberChange('infants', 'decrement')}
                                    style={counterButtonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#3498db';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#3498db';
                                    }}
                                >
                                    -
                                </button>
                                <span style={counterSpanStyle}>{formData.infants}</span>
                                <button
                                    type="button"
                                    onClick={() => handleNumberChange('infants', 'increment')}
                                    style={counterButtonStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#3498db';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = '#3498db';
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Number */}
                <div style={{...inputGroupStyle, ...mobileSectionStyle}}>
                    <label style={labelStyle}>MOBILE NO.</label>
                    <input
                        type="tel"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        placeholder="Enter mobile no."
                        required
                        style={inputStyle}
                    />
                </div>

                {/* Submit Button */}
                <div style={submitSectionStyle}>
                    <button
                        type="submit"
                        style={submitButtonStyle}
                        onMouseOver={(e) => e.target.style.background = '#c0392b'}
                        onMouseOut={(e) => e.target.style.background = '#e74c3c'}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FlightBooking;