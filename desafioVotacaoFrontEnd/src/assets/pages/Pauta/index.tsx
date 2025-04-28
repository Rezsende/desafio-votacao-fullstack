import { Datapauta } from "./hooks/data_fecht";

export const Index = () => {
  const { data, isLoading, isError } = Datapauta();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Erro</p>
        <p>Não foi possível carregar as pautas</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Sistema de Votação</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">Gerencie as sessões de votação</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((pauta: any) => (
            <div
              key={pauta.id}
              className={`bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg ${
                pauta.sessaoAtiva ? "border-l-8 border-green-500" : "border-l-8 border-red-500"
              }`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${pauta.sessaoAtiva ? "bg-green-100" : "bg-red-100"}`}>
                    <span className={`${pauta.sessaoAtiva ? "text-green-600" : "text-red-600"} font-bold`}>{pauta.sessaoAtiva ? "A" : "I"}</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{pauta.titulo}</h3>
                    <p className="text-sm text-gray-500">{pauta.descricao}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Status:</span>
                    <span className={`font-semibold ${pauta.sessaoAtiva ? "text-green-600" : "text-red-600"}`}>{pauta.sessaoAtiva ? "Ativa" : "Inativa"}</span>
                  </div>

                  {pauta.sessaoAtiva ? (
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Abertura:</span> {new Date(pauta.dataAbertura).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Fechamento:</span> {new Date(pauta.dataFechamento).toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <button className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                      Iniciar Sessão
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
