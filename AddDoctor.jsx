import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    specialization: '',
    gender: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCase = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toUpperCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/admin/adddoctor`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          username: '',
          password: '',
          specialization: '',
          gender: '',
          contact: ''
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const styles = {
    formContainer: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      textDecoration: 'underline',
      fontSize: '24px',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#4CAF50',
      outline: 'none',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '5px',
      display: 'block',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    successMessage: {
      color: 'green',
      fontWeight: 'bolder',
      textAlign: 'center',
      marginTop: '20px',
    },
    errorMessage: {
      color: 'red',
      fontWeight: 'bolder',
      textAlign: 'center',
      marginTop: '20px',
    },
  };

  return (
    <div>
      <h3 style={styles.heading}>Add Doctor</h3>
      {
        message ? 
        <p style={styles.successMessage}>{message}</p> : 
        <p style={styles.errorMessage}>{error}</p>
      }
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Full Name</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            onKeyUp={handleCase} 
            required 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div>
          <label style={styles.label}>Username</label>
          <input 
            type="text" 
            id="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div>
          <label style={styles.label}>Specialization</label>
          <input 
            type="text" 
            id="specialization" 
            value={formData.specialization} 
            onChange={handleChange} 
            required 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div>
          <label style={styles.label}>Gender</label>
          <select 
            id="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required 
            style={styles.input}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label style={styles.label}>Mobile No</label>
          <input 
            type="number" 
            id="contact" 
            value={formData.contact} 
            onChange={handleChange} 
            required 
            style={styles.input} 
            onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <button 
          type="submit" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Add
        </button>
      </form>
    </div>
  );
}
