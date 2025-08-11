import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";
import '../editEventForm/editEvent.css'

export default function EditEventForm({ onUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    idEventCategory: "",
    idEventLocation: "",
    startDate: "",
    durationInMinutes: "",
    price: "",
    enabledForEnrollment: false,
    maxAssistance: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiFetch(`/event/${id}`)
      .then((data) => {
        // Aquí podés formatear startDate si hace falta (para datetime-local)
        const formattedStartDate = data.start_date
          ? new Date(data.start_date).toISOString().slice(0, 16)
          : "";

        setFormData({
          id: data.id,
          name: data.name || "",
          description: data.description || "",
          idEventCategory: data.id_event_category || "",
          idEventLocation: data.id_event_location || "",
          startDate: formattedStartDate,
          durationInMinutes: data.duration_in_minutes || "",
          price: data.price || "",
          enabledForEnrollment: data.enabled_for_enrollment || false,
          maxAssistance: data.max_assistance || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("No se pudo cargar el evento.");
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updated = await apiFetch("/api/event", {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      setSuccess(true);
      if (onUpdated) onUpdated(updated);
      else navigate(`/event/${updated.id}`); // redirigir a detalle después de actualizar
    } catch (err) {
      setError(err.message || "Error al actualizar el evento");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Cargando datos del evento...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="total">
         <form onSubmit={handleSubmit} className="edit-event-form__container" style={{ maxWidth: "600px", margin: "0 auto" }}>
  <h2 className="edit-event-form__title">Editar Evento</h2>

  {error && <p className="edit-event-form__error">{error}</p>}
  {success && <p className="edit-event-form__success">Evento actualizado correctamente</p>}

  <label className="edit-event-form__label">
    Nombre:
    <input
      className="edit-event-form__input"
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__label">
    Descripción:
    <textarea
      className="edit-event-form__textarea"
      name="description"
      value={formData.description}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__label">
    Categoría (ID):
    <input
      className="edit-event-form__input"
      type="number"
      name="idEventCategory"
      value={formData.idEventCategory}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__label">
    Ubicación (ID):
    <input
      className="edit-event-form__input"
      type="number"
      name="idEventLocation"
      value={formData.idEventLocation}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__label">
    Fecha de inicio:
    <input
      className="edit-event-form__input"
      type="datetime-local"
      name="startDate"
      value={formData.startDate}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__label">
    Duración (minutos):
    <input
      className="edit-event-form__input"
      type="number"
      name="durationInMinutes"
      value={formData.durationInMinutes}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__label">
    Precio:
    <input
      className="edit-event-form__input"
      type="number"
      name="price"
      value={formData.price}
      onChange={handleChange}
      required
    />
  </label>

  <label className="edit-event-form__checkbox-label">
    Habilitado para inscripción:
    <input
      className="edit-event-form__checkbox"
      type="checkbox"
      name="enabledForEnrollment"
      checked={formData.enabledForEnrollment}
      onChange={handleChange}
    />
  </label>

  <label className="edit-event-form__label">
    Máxima asistencia:
    <input
      className="edit-event-form__input"
      type="number"
      name="maxAssistance"
      value={formData.maxAssistance}
      onChange={handleChange}
      required
    />
  </label>

  <button
    className="edit-event-form__button"
    type="submit"
    disabled={loading}
  >
    {loading ? "Actualizando..." : "Guardar cambios"}
  </button>
</form>
    </div>
   

  );
}