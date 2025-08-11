import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login.jsx';
import Register from './components/register/register.jsx';
import EventList from './components/eventList/eventList.jsx';
import EventDetail from './components/eventDetail/eventDetail.jsx';
import EventForm from './components/eventForm/eventForm.jsx';
import ParticipantsList from './components/participantsList/participantsList.jsx';
import EventLocationForm from './components/eventLocationForm/eventLocationForm.jsx';
import Navbar from './components/navbar/navbar.jsx';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';
import ProfileView from './views/profileView.jsx';
import EditEventForm from './components/EditEventForm/EditEventForm.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/eventDetail/:id" element={<EventDetail />} />
        <Route path="/editEventForm/:id" element={<EditEventForm/>} />
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

        <Route path="/profileView" element={<ProfileView/>} />

      </Routes>
    </Router>
  );
}

export default App;
