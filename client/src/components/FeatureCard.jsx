const FeatureCard = ({ id, title, description, icon, color }) => {
  return (
    <div id={id} className={`${color} rounded-xl p-6 transition-transform hover:scale-105 shadow-sm hover:shadow-md`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 text-[#FF8E7E] font-medium hover:text-[#FF7A68] flex items-center">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default FeatureCard
