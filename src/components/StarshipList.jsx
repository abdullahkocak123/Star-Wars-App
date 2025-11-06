import { Link } from "react-router-dom";

// Helper: extract numeric id from SWAPI resource URL (e.g. /api/starships/9/ -> 9)
const getIdFromUrl = (url) => {
  if (!url) return null;
  const m = url.match(/\/(\d+)\/?$/);
  return m ? m[1] : null;
};

const StarshipList = ({
  ships,
  loading,
  onSearch,
  searchTerm,
  loadMore,
  hasMore,
}) => {
  return (
    <div className="w-full p-4">
      {ships.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="text-yellow-400 text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-medium text-gray-300">
            No starships found
          </h3>
          <p className="text-gray-400 mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ships.map((ship, index) => (
            <div
              key={`${ship.name}-${index}`}
              className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-yellow-500/20 flex flex-col h-full"
              style={{ border: '2px solid red' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500/80 to-transparent"></div>
              <div className="relative h-16 w-full overflow-hidden group bg-gradient-to-r from-gray-900/80 to-gray-800/60 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-400/20 flex items-center justify-center">
                    <span className="text-yellow-400">🚀</span>
                  </div>
                  <div className="text-left truncate">
                    <h3 className="text-lg font-semibold text-yellow-300 truncate">
                      {ship.name}
                    </h3>
                    <p className="text-xs text-gray-300 font-mono truncate">
                      {ship.model}
                    </p>
                  </div>
                  <div className="ml-auto z-20">
                    <div className="w-7 h-7 rounded-full bg-yellow-500/20 backdrop-blur-sm flex items-center justify-center text-yellow-300 text-[11px] font-semibold border border-yellow-400/20">
                      {index + 1}
                    </div>
                  </div>
                </div>
              </div>

              {/* Orta Kısım - Detaylar */}
              <div className="p-6 bg-gray-800/60 backdrop-blur-sm flex-1 flex flex-col rounded-b-xl">
                <div className="grid grid-cols-2 gap-3 text-sm flex-1">
                  <div className="space-y-1">
                    <p className="text-yellow-400 font-medium flex items-center">
                      <span className="w-4 h-4 mr-1 inline-block text-yellow-400">
                        ⚡
                      </span>
                      Hız
                    </p>
                    <p className="text-gray-300 font-mono">
                      {ship.max_atmosphering_speed || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-yellow-400 font-medium flex items-center">
                      <span className="w-4 h-4 mr-1 inline-block">👥</span>
                      Yolcu
                    </p>
                    <p className="text-gray-300 font-mono">{ship.passengers}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-yellow-400 font-medium flex items-center">
                      <span className="w-4 h-4 mr-1 inline-block">👥</span>
                      Mürettebat
                    </p>
                    <p className="text-gray-300 font-mono">{ship.crew}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-yellow-400 font-medium flex items-center">
                      <span className="w-4 h-4 mr-1 inline-block">🏷️</span>
                      Sınıf
                    </p>
                    <p className="text-gray-300 font-mono">
                      {ship.starship_class || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Detay Butonu */}
                <Link
                  to={`/starship/${index + 1}`}
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors duration-300 transform hover:scale-105"
                >
                  Detayları Görüntüle
                  <span className="w-4 h-4 ml-2 inline-block">→</span>
                </Link>
              </div>
            </div>
          ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin -ml-1 mr-3 h-5 w-5 rounded-full border-2 border-t-transparent border-gray-900"></span>
                Loading...
              </span>
            ) : (
              "Load More Starships"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default StarshipList;
