import Swal from "sweetalert2";

const AlertComponent = () => {
  const handleClick = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <main>
      <div className="container">
        <h2>alert component</h2>

        <button onClick={handleClick}>alert</button>
      </div>
    </main>
  );
};
export default AlertComponent;
