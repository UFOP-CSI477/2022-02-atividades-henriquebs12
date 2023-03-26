import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  Layout,
  notificationProvider,
  refineTheme,
} from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
  LocaisColetaCreate,
  LocaisColetaEdit,
  LocaisColetaList,
  LocaisColetaShow,
} from "pages/locais-coleta";
import {
  TiposSanguineosCreate,
  TiposSanguineosEdit,
  TiposSanguineosList,
  TiposSanguineosShow,
} from "pages/tipos-sanguineos";
import {
  EstadosCreate,
  EstadosEdit,
  EstadosList,
  EstadosShow,
} from "pages/estados";
import {
  CidadesCreate,
  CidadesEdit,
  CidadesList,
  CidadesShow,
} from "pages/cidades";
import {
  DoacoesCreate,
  DoacoesEdit,
  DoacoesList,
  DoacoesShow,
} from "pages/doacoes";
import {
  PessoasCreate,
  PessoasEdit,
  PessoasList,
  PessoasShow,
} from "pages/pessoas";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ChakraProvider theme={refineTheme}>
          <Refine
            dataProvider={dataProvider("http://localhost:3333")}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            resources={[
              {
                name: "locais-coleta",
                list: "/refine-locais-coleta",
                create: "/refine-locais-coleta/create",
                edit: "/refine-locais-coleta/edit/:id",
                show: "/refine-locais-coleta/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "tipos-sanguineos",
                list: "/refine-tipos-sanguineos",
                create: "/refine-tipos-sanguineos/create",
                edit: "/refine-tipos-sanguineos/edit/:id",
                show: "/refine-tipos-sanguineos/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "cidades",
                list: "/refine-cidades",
                create: "/refine-cidades/create",
                edit: "/refine-cidades/edit/:id",
                show: "/refine-cidades/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "pessoas",
                list: "/refine-pessoas",
                create: "/refine-pessoas/create",
                edit: "/refine-pessoas/edit/:id",
                show: "/refine-pessoas/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "doacoes",
                list: "/refine-doacoes",
                create: "/refine-doacoes/create",
                edit: "/refine-doacoes/edit/:id",
                show: "/refine-doacoes/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "estados",
                list: "/refine-estados",
                create: "/refine-estados/create",
                edit: "/refine-estados/edit/:id",
                show: "/refine-estados/show/:id",
                meta: {
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Layout Header={Header}>
                    <Outlet />
                  </Layout>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="locais-coleta" />}
                />
                <Route path="/refine-locais-coleta">
                  <Route index element={<LocaisColetaList />} />
                  <Route path="create" element={<LocaisColetaCreate />} />
                </Route>

                <Route path="/refine-tipos-sanguineos">
                  <Route index element={<TiposSanguineosList />} />
                  <Route path="create" element={<TiposSanguineosCreate />} />
                  <Route path="edit/:id" element={<TiposSanguineosEdit />} />
                  <Route path="show/:id" element={<TiposSanguineosShow />} />
                </Route>

                <Route path="/refine-doacoes">
                  <Route index element={<DoacoesList />} />
                  <Route path="create" element={<DoacoesCreate />} />
                  <Route path="edit/:id" element={<DoacoesEdit />} />
                  <Route path="show/:id" element={<DoacoesShow />} />
                </Route>


                <Route path="/refine-pessoas">
                  <Route index element={<PessoasList />} />
                  <Route path="create" element={<PessoasCreate />} />
                </Route>

                <Route path="/refine-estados">
                  <Route index element={<EstadosList />} />
                  <Route path="create" element={<EstadosCreate />} />
                  <Route path="edit/:id" element={<EstadosEdit />} />
                  <Route path="show/:id" element={<EstadosShow />} />
                </Route>

                <Route path="/refine-cidades">
                  <Route index element={<CidadesList />} />
                  <Route path="create" element={<CidadesCreate />} />
                </Route>

                <Route
                  element={
                    <Layout Header={Header}>
                      <Outlet />
                    </Layout>
                  }
                >
                </Route>



              
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
