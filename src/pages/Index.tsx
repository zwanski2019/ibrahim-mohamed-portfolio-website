import { useEffect } from "react";

const Index = () => {
  console.log('Index component rendering - MINIMAL VERSION');
  
  useEffect(() => {
    console.log('Index component mounted');
    document.body.style.backgroundColor = 'red'; // Temporary visual indicator
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'blue', 
      color: 'white', 
      padding: '20px',
      fontSize: '24px'
    }}>
      <h1>TEST - Index Component is Working!</h1>
      <p>If you can see this, the component is rendering correctly.</p>
      <p>Background should be blue with white text.</p>
    </div>
  );
};

export default Index;