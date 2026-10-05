import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
  Truck,
  MapPin,
  Map,
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2,
  Wallet,
  Loader2,
} from 'lucide-react';

const ACTIVE_STATUSES = ['Pending', 'Assigned', 'InProgress'];
const DONE_STATUSES = ['Completed', 'Paid'];

const vehicleLabels = {
  miniTruck: 'Mini Truck',
  smallVan: 'Small Van',
  pickupTruck: 'Pickup Truck',
  mediumDutyTruck: 'Medium Duty Truck',
  containerTruck: 'Container Truck',
  openBodyTruck: 'Open Body Truck',
};

function formatCurrency(value) {
  const number = Number(value) || 0;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(number);
  } catch {
    return `₹${number.toLocaleString()}`;
  }
}

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function StatusPill({ status }) {
  const normalized = (status || '').toLowerCase();
  let classes = 'bg-gray-100 text-gray-700';
  if (normalized === 'pending') classes = 'bg-yellow-50 text-yellow-700';
  else if (['assigned', 'inprogress', 'on the way', 'ontheway'].includes(normalized))
    classes = 'bg-blue-50 text-blue-700';
  else if (['completed', 'paid'].includes(normalized)) classes = 'bg-green-50 text-green-700';
  else if (['cancelled', 'canceled'].includes(normalized)) classes = 'bg-red-50 text-red-700';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${classes}`}
    >
      {status}
    </span>
  );
}

export default function ClientDashboardHome() {
  const clientId = localStorage.getItem('clientId');
  const [client, setClient] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/Client/Profile/${clientId}`)
      .then((res) => setClient(res.data))
      .catch((err) => console.error('Failed to load profile:', err));
  }, [clientId]);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/Client/Trip/GetAll/${clientId}`)
      .then((res) => setTrips(res.data.trips || []))
      .catch((err) => {
        console.error('Failed to load trips:', err);
        setTrips([]);
      })
      .finally(() => setLoading(false));
  }, [clientId]);

  const activeTrips = trips.filter((t) => ACTIVE_STATUSES.includes(t?.status));
  const doneTrips = trips.filter((t) => DONE_STATUSES.includes(t?.status));
  const recentTrips = [...doneTrips]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 4);
  const totalSpent = doneTrips.reduce((sum, t) => sum + (Number(t.pricing?.total) || 0), 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = client?.fullName?.split(' ')[0] || 'there';

  const subline = loading
    ? 'Loading your trips…'
    : activeTrips.length > 0
      ? `You have ${activeTrips.length} active trip${activeTrips.length > 1 ? 's' : ''}.`
      : trips.length === 0
        ? 'Book your first move — get a quote in seconds.'
        : "Here's what's happening with your moves.";

  const handlePayment = async (trip) => {
    const txnid = `TXN${Date.now()}`;
    const paymentDetails = {
      amount: trip.pricing?.total,
      firstname: trip.fullName || 'Guest',
      email: 'test@example.com',
      productinfo: 'EzShift Trip',
      txnid,
      tripId: trip._id,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payu/Client/pay`,
        paymentDetails
      );
      if (res.data.success) {
        redirectToPayU(res.data.data);
      } else {
        toast.error('Payment initialization failed.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error processing payment.');
    }
  };

  function redirectToPayU(data) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://test.payu.in/_payment';
    for (const key in data) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  }

  const stats = [
    { label: 'Trips booked', value: String(trips.length), icon: Truck },
    { label: 'Completed', value: String(doneTrips.length), icon: CheckCircle2 },
    { label: 'Total spent', value: formatCurrency(totalSpent), icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {greeting}, {firstName} 👋
          </h1>
          <p className="mt-1.5 text-gray-600">{subline}</p>
        </div>

        {/* Book a trip CTA */}
        <Link to="/Client/BookTrip" className="block group">
          <div className="bg-gradient-to-br from-primary to-sky-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-primary/20 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Truck size={26} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold">Book your next move</h2>
              <p className="text-white/85 text-sm mt-0.5">
                Get an instant distance-based quote in minutes.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-white text-primary font-semibold px-5 py-2.5 rounded-xl text-sm shrink-0 group-hover:gap-2.5 transition-all">
              Book a Trip <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                  <Icon size={17} />
                </div>
                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-tight truncate">
                  {loading ? '—' : stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Active trips */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Active Trips</h2>
            {activeTrips.length > 0 && (
              <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">
                {activeTrips.length} active
              </span>
            )}
          </div>

          {loading ? (
            <div className="h-32 bg-gray-200 animate-pulse rounded-2xl" />
          ) : activeTrips.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
              <Truck size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">No active trips</p>
              <p className="text-sm text-gray-500 mt-1">Book a trip and track it live from here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTrips.map((trip) => (
                <div key={trip._id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                          <MapPin size={15} className="text-primary shrink-0" />
                          <span className="truncate">{trip.pickupAddress}</span>
                        </div>
                        <div className="my-1.5 h-px w-5 bg-gray-300 mx-1.5"></div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                          <MapPin size={15} className="text-red-500 shrink-0" />
                          <span className="truncate">{trip.dropAddress}</span>
                        </div>
                      </div>
                      <StatusPill status={trip.status} />
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                      <span>{formatDate(trip.date)}</span>
                      {trip.timeSlot && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {trip.timeSlot}
                        </span>
                      )}
                      <span>{vehicleLabels[trip.vehicleType] || trip.vehicleType}</span>
                      <span className="font-semibold text-gray-900 ml-auto">
                        {formatCurrency(trip.pricing?.total)}
                      </span>
                    </div>

                    <div className="mt-4">
                      <Link
                        to="/Client/Map"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors"
                      >
                        <Map size={15} /> Track on Map
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent trips */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Trips</h2>
            <Link to="/Client/History" className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="h-40 bg-gray-200 animate-pulse rounded-2xl" />
          ) : recentTrips.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
              <CheckCircle2 size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">No completed trips yet</p>
              <p className="text-sm text-gray-500 mt-1">Your past trips and receipts will show up here.</p>
            </div>
          ) : (
            <ul className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
              {recentTrips.map((trip) => (
                <li key={trip._id} className="p-4 sm:px-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                    <Truck size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {trip.pickupAddress} → {trip.dropAddress}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatDate(trip.date)} · {formatCurrency(trip.pricing?.total)}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {trip.isPaid || trip.status === 'Paid' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                        <CheckCircle2 size={14} /> Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(trip)}
                        className="px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Support */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900">Need help with a move?</h3>
            <p className="text-sm text-gray-600 mt-0.5">Our team is available to help you plan your trip.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone size={15} /> Call us
            </a>
            <Link
              to="/ContectUs"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin" /> Loading your dashboard…
          </div>
        )}
      </div>
    </div>
  );
}