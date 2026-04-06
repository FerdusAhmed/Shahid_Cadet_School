import React from 'react';
import { FaCloud, FaDatabase, FaLock, FaShieldAlt } from 'react-icons/fa';

const SecureCloudSystem = () => {
 
  return (
    <section className="bg-base-200 py-16 mb-20">
      <div className="section-res">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">
            Secure Cloud System
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Our School Management Platform ensures safe, fast, and reliable
            cloud-based data management with advanced security protection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <FaCloud className="text-4xl text-primary" />
              <h3 className="card-title mt-4">Cloud Storage</h3>
              <p>
                Store and access school data anytime, anywhere with secure cloud
                technology.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <FaLock className="text-4xl text-secondary" />
              <h3 className="card-title mt-4">Data Encryption</h3>
              <p>
                All student and staff information is protected with advanced
                encryption.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <FaDatabase className="text-4xl text-accent" />
              <h3 className="card-title mt-4">Secure Database</h3>
              <p>
                Reliable and structured database system to manage academic
                records safely.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
            <div className="card-body items-center text-center">
              <FaShieldAlt className="text-4xl text-error" />
              <h3 className="card-title mt-4">24/7 Protection</h3>
              <p>
                Continuous monitoring and protection against unauthorized
                access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



  


export default SecureCloudSystem;