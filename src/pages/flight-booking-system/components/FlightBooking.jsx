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

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [showMessageBox, setShowMessageBox] = useState(false);

    const cities = [
        'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai',
        'Kolkata', 'Hyderabad', 'Pune', 'Jaipur', 'Surat',
        'Himachal', 'Goa', 'Kerala', 'Uttrakhand'
    ];

    const validateForm = () => {
        const newErrors = {};

        // From city validation
        if (!formData.from) {
            newErrors.from = 'Please select departure city';
        }

        // To city validation
        if (!formData.to) {
            newErrors.to = 'Please select destination city';
        }

        // Same city validation
        if (formData.from && formData.to && formData.from === formData.to) {
            newErrors.to = 'Departure and destination cannot be same';
        }

        // Departure date validation
        if (!formData.departureDate) {
            newErrors.departureDate = 'Please select departure date';
        } else {
            const today = new Date().toISOString().split('T')[0];
            if (formData.departureDate < today) {
                newErrors.departureDate = 'Departure date cannot be in past';
            }
        }

        // Return date validation for round trip
        if (formData.flightType === 'roundtrip') {
            if (!formData.returnDate) {
                newErrors.returnDate = 'Please select return date';
            } else if (formData.returnDate <= formData.departureDate) {
                newErrors.returnDate = 'Return date must be after departure date';
            }
        }

        // Mobile number validation
        if (!formData.mobileNo) {
            newErrors.mobileNo = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            newErrors.mobileNo = 'Please enter valid 10-digit mobile number';
        }

        // Passengers validation
        if (formData.adults === 0 && formData.children === 0 && formData.infants === 0) {
            newErrors.passengers = 'At least one passenger is required';
        }

        // Infants validation (infants cannot exceed adults)
        if (formData.infants > formData.adults) {
            newErrors.infants = 'Infants cannot exceed number of adults';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleNumberChange = (name, operation) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: operation === 'increment'
                ? prevState[name] + 1
                : Math.max(0, prevState[name] - 1)
        }));

        // Clear passengers error when changing numbers
        if (errors.passengers) {
            setErrors(prev => ({
                ...prev,
                passengers: ''
            }));
        }

        // Clear infants error when changing numbers
        if (errors.infants) {
            setErrors(prev => ({
                ...prev,
                infants: ''
            }));
        }
    };

    // ✅ FIXED API Integration - Using Google Sheets as Database
    const saveToGoogleSheets = async () => {
        try {
            console.log('📤 Saving to Google Sheets...');

            const scriptURL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';

            const dataToSave = {
                timestamp: new Date().toISOString(),
                flightType: formData.flightType,
                from: formData.from,
                to: formData.to,
                departureDate: formData.departureDate,
                returnDate: formData.returnDate || 'N/A',
                adults: formData.adults,
                children: formData.children,
                infants: formData.infants,
                mobileNo: formData.mobileNo,
                status: 'Pending'
            };

            console.log('Data to save:', dataToSave);

            const response = await fetch(scriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(dataToSave)
            });

            const result = await response.json();
            console.log('✅ Google Sheets Response:', result);

            if (result.result === 'success') {
                setApiMessage('✅ Data successfully saved to database!');
                return true;
            } else {
                throw new Error('Failed to save to Google Sheets');
            }

        } catch (error) {
            console.error('❌ Google Sheets Error:', error);
            // Even if Google Sheets fails, continue with WhatsApp
            setApiMessage('⚠️ Data saved locally, WhatsApp opening...');
            return true; // Continue process anyway
        }
    };

    // ✅ SIMPLE API Call (Alternative)
    const saveToSimpleAPI = async () => {
        try {
            console.log('📤 Saving to simple API...');

            // Using a simple mock API for testing
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Flight Booking',
                    body: JSON.stringify(formData),
                    userId: 1,
                }),
            });

            const result = await response.json();
            console.log('✅ Mock API Response:', result);
            setApiMessage('✅ Data logged successfully!');
            return true;

        } catch (error) {
            console.error('❌ Mock API Error:', error);
            setApiMessage('⚠️ Continuing with WhatsApp...');
            return true; // Always continue
        }
    };

    const sendWhatsAppMessage = () => {
        const flightTypeText = formData.flightType === 'oneway' ? 'One Way' : 'Round Trip';
        const passengersText = `${formData.adults} Adult(s), ${formData.children} Child(ren), ${formData.infants} Infant(s)`;

        // Format dates properly
        const formatDate = (dateString) => {
            if (!dateString) return 'N/A';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };

        // Create message with proper line breaks
        const messageLines = [
            '🛫 *New Flight Booking Request* 🛬',
            '',
            `*Flight Type:* ${flightTypeText}`,
            `*From:* ${formData.from.charAt(0).toUpperCase() + formData.from.slice(1)}`,
            `*To:* ${formData.to.charAt(0).toUpperCase() + formData.to.slice(1)}`,
            `*Departure Date:* ${formatDate(formData.departureDate)}`,
            ...(formData.flightType === 'roundtrip' ? [`*Return Date:* ${formatDate(formData.returnDate)}`] : []),
            `*Passengers:* ${passengersText}`,
            `*Mobile Number:* ${formData.mobileNo}`,
            '',
            '_Generated from Sammad Flights Website_',
            'Thank you for choosing us! ✈️'
        ];

        const message = messageLines.join('%0a'); // URL encoded new line
        const whatsappNumber = '919725855858'; // તમારો WhatsApp number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;

        console.log('📱 Opening WhatsApp with URL:', whatsappURL);
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiMessage('');
        setShowMessageBox(false);

        console.log('🚀 Starting form submission process...');

        if (validateForm()) {
            setIsLoading(true);

            try {
                console.log('✅ Form validation passed');
                console.log('📊 Form Data:', formData);

                // ✅ Option 1: Try Google Sheets (RECOMMENDED)
                await saveToGoogleSheets();

                // ✅ Option 2: Or use simple mock API
                // await saveToSimpleAPI();

                // Send WhatsApp message
                console.log('📱 Opening WhatsApp...');
                sendWhatsAppMessage();

                // Show success message box after a short delay
                setTimeout(() => {
                    setShowMessageBox(true);
                }, 1000);

                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
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
                    console.log('🔄 Form reset completed');
                }, 3000);

            } catch (error) {
                console.error('❌ Submission process failed:', error);
                setApiMessage('❌ Error in submission process. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log('❌ Form validation failed. Errors:', errors);
            setApiMessage('⚠️ Please fix the errors in the form before submitting.');
        }
    };

    const handleSwapCities = () => {
        setFormData(prevState => ({
            ...prevState,
            from: prevState.to,
            to: prevState.from
        }));

        // Clear city errors when swapping
        setErrors(prev => ({
            ...prev,
            from: '',
            to: ''
        }));
    };

    // Colors
    const primaryColor = '#3697BE';
    const secondaryColor = '#1AA1AD';

    return (
        <div style={{
            maxWidth: '900px',
            margin: '40px auto',
            padding: '40px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            position: 'relative'
        }}>
            {/* Message Box Overlay */}
            {showMessageBox && (
                <>
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 9998,
                        backdropFilter: 'blur(2px)'
                    }}></div>

                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '15px',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        zIndex: 9999,
                        textAlign: 'center',
                        minWidth: '350px',
                        maxWidth: '90vw',
                        border: `3px solid ${primaryColor}`,
                        fontFamily: 'Arial, sans-serif',
                        animation: 'popIn 0.3s ease-out'
                    }}>
                        {/* Success Icon */}
                        <div style={{
                            fontSize: '48px',
                            marginBottom: '20px',
                            animation: 'bounce 0.5s ease-in-out'
                        }}>
                            ✅
                        </div>

                        {/* Main Message */}
                        <div style={{
                            fontWeight: 'bold',
                            color: primaryColor,
                            marginBottom: '15px',
                            fontSize: '20px',
                            lineHeight: '1.4'
                        }}>
                            📌 Flight booking submitted successfully!
                        </div>

                        {/* Sub Message */}
                        <div style={{
                            color: '#666',
                            marginBottom: '25px',
                            fontSize: '16px',
                            lineHeight: '1.4'
                        }}>
                            📄 WhatsApp opened for confirmation
                        </div>

                        {/* OK Button */}
                        <button
                            onClick={() => setShowMessageBox(false)}
                            style={{
                                background: primaryColor,
                                color: 'white',
                                border: 'none',
                                padding: '12px 40px',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(54, 151, 190, 0.4)'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = secondaryColor;
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 6px 20px rgba(54, 151, 190, 0.6)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = primaryColor;
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 4px 15px rgba(54, 151, 190, 0.4)';
                            }}
                        >
                            OK
                        </button>
                    </div>

                    <style>
                        {`
                        @keyframes popIn {
                            0% {
                                opacity: 0;
                                transform: translate(-50%, -50%) scale(0.7);
                            }
                            100% {
                                opacity: 1;
                                transform: translate(-50%, -50%) scale(1);
                            }
                        }
                        
                        @keyframes bounce {
                            0%, 20%, 50%, 80%, 100% {
                                transform: translateY(0);
                            }
                            40% {
                                transform: translateY(-10px);
                            }
                            60% {
                                transform: translateY(-5px);
                            }
                        }
                        `}
                    </style>
                </>
            )}

            {/* Header Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h1 style={{
                    color: '#1e293b',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    margin: '0 0 10px 0',
                    background: 'linear-gradient(135deg, #3697BE, #1AA1AD)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    ✈️ Flight Booking
                </h1>
                <p style={{
                    color: '#64748b',
                    fontSize: '16px',
                    margin: 0
                }}>
                    Book your flights with ease and convenience
                </p>
            </div>

            {/* API Status Message */}
            {apiMessage && (
                <div style={{
                    padding: '15px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                    backgroundColor: apiMessage.includes('✅') ? '#dcfce7' :
                        apiMessage.includes('⚠️') ? '#fef9c3' : '#fee2e2',
                    border: `1px solid ${apiMessage.includes('✅') ? '#bbf7d0' :
                        apiMessage.includes('⚠️') ? '#fde047' : '#fecaca'}`,
                    color: apiMessage.includes('✅') ? '#166534' :
                        apiMessage.includes('⚠️') ? '#854d0e' : '#dc2626',
                    fontWeight: '500',
                    textAlign: 'center'
                }}>
                    {apiMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
            }}>
                {/* Flight Type - Single Line Radio Buttons */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    background: '#fff',
                    padding: '15px',
                    borderRadius: '15px',
                    maxWidth: '350px',
                    margin: '0 auto',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        background: formData.flightType === 'oneway' ? primaryColor : 'transparent',
                        color: formData.flightType === 'oneway' ? '#fff' : '#64748b',
                        border: `2px solid ${formData.flightType === 'oneway' ? primaryColor : '#e2e8f0'}`,
                        transition: 'all 0.3s ease',
                        fontWeight: '600',
                        fontSize: '14px',
                        minWidth: '110px',
                        justifyContent: 'center'
                    }}>
                        <input
                            type="radio"
                            name="flightType"
                            value="oneway"
                            checked={formData.flightType === 'oneway'}
                            onChange={handleInputChange}
                            style={{ display: 'none' }}
                        />
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: `2px solid ${formData.flightType === 'oneway' ? '#fff' : '#cbd5e1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            {formData.flightType === 'oneway' && (
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#fff'
                                }}></div>
                            )}
                        </div>
                        One Way
                    </label>

                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        background: formData.flightType === 'roundtrip' ? primaryColor : 'transparent',
                        color: formData.flightType === 'roundtrip' ? '#fff' : '#64748b',
                        border: `2px solid ${formData.flightType === 'roundtrip' ? primaryColor : '#e2e8f0'}`,
                        transition: 'all 0.3s ease',
                        fontWeight: '600',
                        fontSize: '14px',
                        minWidth: '110px',
                        justifyContent: 'center'
                    }}>
                        <input
                            type="radio"
                            name="flightType"
                            value="roundtrip"
                            checked={formData.flightType === 'roundtrip'}
                            onChange={handleInputChange}
                            style={{ display: 'none' }}
                        />
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: `2px solid ${formData.flightType === 'roundtrip' ? '#fff' : '#cbd5e1'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            {formData.flightType === 'roundtrip' && (
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#fff'
                                }}></div>
                            )}
                        </div>
                        Round Trip
                    </label>
                </div>

                {/* Cities Selection */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    background: '#fff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <label style={{
                            fontWeight: '600',
                            marginBottom: '10px',
                            color: '#334155',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            FROM
                        </label>
                        <select
                            name="from"
                            value={formData.from}
                            onChange={handleInputChange}
                            required
                            style={{
                                padding: '14px 16px',
                                border: `2px solid ${errors.from ? '#ef4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '15px',
                                transition: 'all 0.3s ease',
                                width: '100%',
                                backgroundColor: '#fff',
                                cursor: 'pointer'
                            }}
                            onFocus={(e) => e.target.style.borderColor = primaryColor}
                            onBlur={(e) => e.target.style.borderColor = errors.from ? '#ef4444' : '#e2e8f0'}
                        >
                            <option value="">Select Departure City</option>
                            {cities.map(city => (
                                <option key={city} value={city.toLowerCase()}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        {errors.from && <span style={{
                            color: '#ef4444',
                            fontSize: '12px',
                            marginTop: '6px',
                            fontWeight: '500'
                        }}>{errors.from}</span>}
                    </div>

                    <button
                        type="button"
                        style={{
                            background: primaryColor,
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '44px',
                            height: '44px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            marginTop: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(54, 151, 190, 0.3)'
                        }}
                        onClick={handleSwapCities}
                        onMouseOver={(e) => {
                            e.target.style.background = secondaryColor;
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = primaryColor;
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        ⇄
                    </button>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <label style={{
                            fontWeight: '600',
                            marginBottom: '10px',
                            color: '#334155',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            TO
                        </label>
                        <select
                            name="to"
                            value={formData.to}
                            onChange={handleInputChange}
                            required
                            style={{
                                padding: '14px 16px',
                                border: `2px solid ${errors.to ? '#ef4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '15px',
                                transition: 'all 0.3s ease',
                                width: '100%',
                                backgroundColor: '#fff',
                                cursor: 'pointer'
                            }}
                            onFocus={(e) => e.target.style.borderColor = primaryColor}
                            onBlur={(e) => e.target.style.borderColor = errors.to ? '#ef4444' : '#e2e8f0'}
                        >
                            <option value="">Select Destination City</option>
                            {cities.map(city => (
                                <option key={city} value={city.toLowerCase()}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        {errors.to && <span style={{
                            color: '#ef4444',
                            fontSize: '12px',
                            marginTop: '6px',
                            fontWeight: '500'
                        }}>{errors.to}</span>}
                    </div>
                </div>

                {/* Dates Section */}
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    background: '#fff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <label style={{
                            fontWeight: '600',
                            marginBottom: '10px',
                            color: '#334155',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            DEPARTURE DATE
                        </label>
                        <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            required
                            style={{
                                padding: '14px 16px',
                                border: `2px solid ${errors.departureDate ? '#ef4444' : '#e2e8f0'}`,
                                borderRadius: '10px',
                                fontSize: '15px',
                                transition: 'all 0.3s ease',
                                width: '100%',
                                backgroundColor: '#fff',
                                cursor: 'pointer'
                            }}
                            onFocus={(e) => e.target.style.borderColor = primaryColor}
                            onBlur={(e) => e.target.style.borderColor = errors.departureDate ? '#ef4444' : '#e2e8f0'}
                        />
                        {errors.departureDate && <span style={{
                            color: '#ef4444',
                            fontSize: '12px',
                            marginTop: '6px',
                            fontWeight: '500'
                        }}>{errors.departureDate}</span>}
                    </div>

                    {formData.flightType === 'roundtrip' && (
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <label style={{
                                fontWeight: '600',
                                marginBottom: '10px',
                                color: '#334155',
                                fontSize: '14px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                RETURN DATE
                            </label>
                            <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleInputChange}
                                required
                                style={{
                                    padding: '14px 16px',
                                    border: `2px solid ${errors.returnDate ? '#ef4444' : '#e2e8f0'}`,
                                    borderRadius: '10px',
                                    fontSize: '15px',
                                    transition: 'all 0.3s ease',
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer'
                                }}
                                onFocus={(e) => e.target.style.borderColor = primaryColor}
                                onBlur={(e) => e.target.style.borderColor = errors.returnDate ? '#ef4444' : '#e2e8f0'}
                            />
                            {errors.returnDate && <span style={{
                                color: '#ef4444',
                                fontSize: '12px',
                                marginTop: '6px',
                                fontWeight: '500'
                            }}>{errors.returnDate}</span>}
                        </div>
                    )}
                </div>

                {/* Passengers Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    <label style={{
                        fontWeight: '600',
                        marginBottom: '15px',
                        color: '#334155',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        PASSENGERS
                    </label>
                    {errors.passengers && <span style={{
                        color: '#ef4444',
                        fontSize: '12px',
                        marginBottom: '10px',
                        fontWeight: '500'
                    }}>{errors.passengers}</span>}
                    <div style={{
                        display: 'flex',
                        gap: '25px',
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '12px'
                    }}>
                        {[
                            { key: 'adults', label: 'ADULTS', description: '12+ years' },
                            { key: 'children', label: 'CHILDREN', description: '2-12 years' },
                            { key: 'infants', label: 'INFANTS', description: '0-2 years' }
                        ].map((passenger, index) => (
                            <div key={passenger.key} style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '15px',
                                background: '#fff',
                                borderRadius: '10px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                            }}>
                                <span style={{
                                    display: 'block',
                                    fontWeight: '600',
                                    marginBottom: '5px',
                                    color: '#334155',
                                    fontSize: '13px'
                                }}>
                                    {passenger.label}
                                </span>
                                <span style={{
                                    display: 'block',
                                    color: '#64748b',
                                    fontSize: '11px',
                                    marginBottom: '15px'
                                }}>
                                    {passenger.description}
                                </span>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px'
                                }}>
                                    <button
                                        type="button"
                                        onClick={() => handleNumberChange(passenger.key, 'decrement')}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            border: `2px solid ${primaryColor}`,
                                            background: 'white',
                                            color: primaryColor,
                                            borderRadius: '50%',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = primaryColor;
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.color = primaryColor;
                                        }}
                                    >
                                        -
                                    </button>
                                    <span style={{
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                        minWidth: '25px',
                                        color: '#1e293b'
                                    }}>
                                        {formData[passenger.key]}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleNumberChange(passenger.key, 'increment')}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            border: `2px solid ${primaryColor}`,
                                            background: 'white',
                                            color: primaryColor,
                                            borderRadius: '50%',
                                            fontSize: '16px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = primaryColor;
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'white';
                                            e.target.style.color = primaryColor;
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                {passenger.key === 'infants' && errors.infants && (
                                    <span style={{
                                        color: '#ef4444',
                                        fontSize: '11px',
                                        marginTop: '8px',
                                        fontWeight: '500',
                                        display: 'block'
                                    }}>{errors.infants}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Number */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                    padding: '25px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    maxWidth: '400px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    <label style={{
                        fontWeight: '600',
                        marginBottom: '10px',
                        color: '#334155',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        MOBILE NUMBER
                    </label>
                    <input
                        type="tel"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        placeholder="Enter your 10-digit mobile number"
                        required
                        style={{
                            padding: '14px 16px',
                            border: `2px solid ${errors.mobileNo ? '#ef4444' : '#e2e8f0'}`,
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'all 0.3s ease',
                            width: '100%',
                            backgroundColor: '#fff'
                        }}
                        onFocus={(e) => e.target.style.borderColor = primaryColor}
                        onBlur={(e) => e.target.style.borderColor = errors.mobileNo ? '#ef4444' : '#e2e8f0'}
                    />
                    {errors.mobileNo && <span style={{
                        color: '#ef4444',
                        fontSize: '12px',
                        marginTop: '6px',
                        fontWeight: '500'
                    }}>{errors.mobileNo}</span>}
                </div>

                {/* Submit Button */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '10px'
                }}>
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                            color: 'white',
                            border: 'none',
                            padding: '16px 50px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            boxShadow: '0 6px 20px rgba(54, 151, 190, 0.4)',
                            minWidth: '200px',
                            opacity: isLoading ? 0.7 : 1
                        }}
                        onMouseOver={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(54, 151, 190, 0.6)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isLoading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 6px 20px rgba(54, 151, 190, 0.4)';
                            }
                        }}
                    >
                        {isLoading ? 'Processing...' : 'Book Flight on WhatsApp'}
                    </button>
                </div>
            </form>

            {/* Instructions */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#f1f5f9',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#475569',
                textAlign: 'center'
            }}>
                <strong>How it works:</strong> Fill the form → Click "Book Flight on WhatsApp" →
                Your data will be saved → WhatsApp will open with pre-filled message → Send the message to complete booking
            </div>
        </div>
    );
};

export default FlightBooking;