
-- Add EurOrbit project to the featured projects
INSERT INTO projects (
  title,
  slug,
  description,
  detailed_description,
  tech_stack,
  category,
  demo_url,
  github_url,
  status,
  featured,
  sort_order,
  metrics
) VALUES (
  'EurOrbit',
  'eurorbit',
  'A European weather forecast tool providing accurate and timely weather updates across Europe.',
  'EurOrbit is a comprehensive weather forecasting application that delivers real-time weather information across European countries. Built with modern web technologies, it provides users with accurate meteorological data, forecasts, and weather trends. The application features an intuitive interface that makes it easy to check weather conditions for multiple European locations.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Weather API', 'Responsive Design'],
  'Web Development',
  'https://zwanski2019.github.io/eurorbit/',
  'https://github.com/zwanski2019/eurorbit',
  'published',
  true,
  2,
  '{
    "year": "2022",
    "type": "weather_app",
    "countries_supported": "European Union",
    "features": ["Real-time weather", "Multi-location support", "Responsive design"]
  }'::jsonb
);
