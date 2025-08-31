
const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-blood">
      <h1 className="text-4xl font-bold mb-4 text-ciel font-gara">Welcome to SecureNotes</h1>
      <p className="text-lg text-nape mb-8 italic font-gara">Your secure place to store notes.</p>
      <a href="/signup" className="bg-none border-ciel border-1 text-nape px-6 py-3 rounded-full hover:bg-ciel font-gara">Get Started</a>
    </div>
  );
}

export default HomePage;