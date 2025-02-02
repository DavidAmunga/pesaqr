import  PesaQR  from "pesaqr";
function App() {

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          width:"100%",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 style={{fontSize: "4rem", fontWeight: "bold"}}>PesaQR</h1>
        <PesaQR type="till" tillNumber="123456" amount="100" width={900} />
      </div>
    </>
  );
}

export default App;
