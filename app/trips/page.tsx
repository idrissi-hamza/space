import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';

import getReservations from '../actions/getReservation';
import { getUserFavorites } from '../actions/getUserFavorites';
import TripsView from '../components/TripsView';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getUserFavorites(currentUser?.id);

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  //to get trips that the current user have reserved
  const CurrentUserTrips = await getReservations({ userId: currentUser.id });

  if (!CurrentUserTrips || CurrentUserTrips.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trip found"
          subtitle="Looks like you haven't reserved any trip yet!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="h-4" />
      <TripsView
        reservations={CurrentUserTrips}
        currentUser={currentUser}
        favorites={favorites}
      />
    </ClientOnly>
  );
};

export default TripsPage;
