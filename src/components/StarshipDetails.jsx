import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StarshipDetails = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStarshipDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://swapi.dev/api/starships/${id}`
        );
        setStarship(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching starship details:", err);
        setError("Failed to load starship details");
        setLoading(false);
      }
    };

    fetchStarshipDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading starship details...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!starship) {
    return <div className="text-center py-12">Starship not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-yellow-400 p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-black">{starship.name}</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            Back to List
          </Link>
        </div>
        <p className="text-black mt-2">{starship.model}</p>
      </div>

      {/* Decorative banner (no images) */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center gap-4">
        <div className="w-12 h-12 rounded-md bg-yellow-500/10 border border-yellow-400/20 flex items-center justify-center text-yellow-300 text-xl">
          🚀
        </div>
        <div>
          <p className="text-sm text-gray-300">
            {starship.starship_class} • {starship.manufacturer}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Hyperdrive: {starship.hyperdrive_rating || "N/A"} • Crew:{" "}
            {starship.crew}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Specifications
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Manufacturer:</span>{" "}
                {starship.manufacturer}
              </p>
              <p>
                <span className="font-medium">Class:</span>{" "}
                {starship.starship_class}
              </p>
              <p>
                <span className="font-medium">Cost:</span>{" "}
                {starship.cost_in_credits} credits
              </p>
              <p>
                <span className="font-medium">Length:</span> {starship.length}{" "}
                meters
              </p>
              <p>
                <span className="font-medium">Max Atmosphering Speed:</span>{" "}
                {starship.max_atmosphering_speed}
              </p>
              <p>
                <span className="font-medium">Hyperdrive Rating:</span>{" "}
                {starship.hyperdrive_rating}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Crew & Capacity
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Crew:</span> {starship.crew}
              </p>
              <p>
                <span className="font-medium">Passengers:</span>{" "}
                {starship.passengers}
              </p>
              <p>
                <span className="font-medium">Cargo Capacity:</span>{" "}
                {starship.cargo_capacity} kg
              </p>
              <p>
                <span className="font-medium">Consumables:</span>{" "}
                {starship.consumables}
              </p>
              <p>
                <span className="font-medium">MGLT:</span> {starship.MGLT}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Additional Information
          </h2>
          <p className="text-gray-700">
            The {starship.name} is a {starship.starship_class} manufactured by{" "}
            {starship.manufacturer}. It has a hyperdrive rating of{" "}
            {starship.hyperdrive_rating} and can carry up to {starship.crew}{" "}
            crew members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StarshipDetails;
