import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import EventList from './views/eventList/eventList.jsx';
import EventDetail from './views/eventDetail/eventDetail.jsx';
import EventForm from './views/eventForm/eventForm.jsx';
import ParticipantsList from './views/participantsList/participantsList.jsx';
import EventLocationForm from './views/eventLocationForm/eventLocationForm.jsx';
import Navbar from './components/navbar/navbar.jsx';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/event/:id/participants" element={<ParticipantsList />} />
        <Route
          path="/event/new"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-location/new"
          element={
            <ProtectedRoute>
              <EventLocationForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
