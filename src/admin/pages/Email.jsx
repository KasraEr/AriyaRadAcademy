export default function Email() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 place-items-center m-auto">
      <button
      className="bg-primary-500 p-4 rounded-2xl text-basic-100"
        onClick={() =>
          window.open("https://mail.ariyaradacademy.com", "_blank")
        }
      >
        برای رفتن به صفحه ایمیل اینجا کلیک کنید
      </button>
    </div>
  );
}
