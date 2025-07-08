import { LoginDto, RefreshTokenResponse, RegisterDto, UserAuth } from '@/types/ApiRequest/Auth'
import { BaseResponse } from '@/types/BaseResponse'
import { getBaseUrl } from '@/types/baseUrl'
import { Pagination } from '@/types/pagination'
import { Trip } from '@/types/ApiReponse/trajetResponse'
import { ListesVehicle, Vehicle } from '@/types/ApiReponse/VehicleResponse'
import { getUserInfos } from '@/app/middleware'
import { Service } from '@/types/ApiReponse/ServicesResponse'
import { DriverInfo, VehicleWithDrivers } from '@/types/ApiReponse/Vehicle-with-drivers'



export const fetchTrips = async ( page: number = 1, limit: number = 10 ): Promise<BaseResponse<Pagination<Trip>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/trips?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const fetchTripsByDrivers = async ( page: number = 1, limit: number = 10): Promise<BaseResponse<Pagination<Trip>>> => {
    try {
        const user = await getUserInfos();
        if (!user) throw new Error("Utilisateur non authentifié");
        // Utiliser partnerId s’il est défini, sinon fallback sur l'id de l'utilisateur
        const identifier = user.partnerId ?? user.id;
        const response = await fetch(
            `${getBaseUrl()}/trips/by-driver/${identifier}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des trajets du conducteur :", error);
        throw error;
    }
};

export const fetchTripById = async (tripId: string): Promise<BaseResponse<Trip>> => {
    try {
        if (!tripId) throw new Error("ID du trajet manquant");

        const response = await fetch(`${getBaseUrl()}/trips/${tripId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération du trajet :", error);
        throw error;
    }
};

// ✅ Création d'un trajet
export const createTrip = async (payload: any): Promise<BaseResponse<Trip>> => {
    const res = await fetch(`${getBaseUrl()}/trips`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
};

// ✅ Modification d'un trajet
export const updateTrip = async (id: string, payload: any): Promise<BaseResponse<Trip>> => {
    const res = await fetch(`${getBaseUrl()}/trips/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
        body: JSON.stringify(payload),
    });
    return await res.json();
};

// Nouvelle fonction pour récupérer les véhicules d'un partenaire
export const fetchVehiclesByPartner = async ( partnerId: string, page: number = 1,limit: number = 10): Promise<BaseResponse<Pagination<Vehicle>>> => {
    try {
        const url = `${getBaseUrl()}/vehicles/by-partner/${partnerId}?page=${page}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`, },
        })
        return await response.json()
    } catch (error) {
        throw error
    }
}

// fetchAllvehicles
export const fetchAllVehicles = async (): Promise<BaseResponse<ListesVehicle[]>> => {
    try {
        const user = await getUserInfos()

        if (!user) throw new Error('Utilisateur non authentifié')

        // Utiliser partnerId s’il est défini, sinon fallback sur l'id de l'utilisateur
        const identifier = user.partnerId ?? user.id

        const response = await fetch(`${getBaseUrl()}/vehicles?partnerId=${identifier}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        return await response.json()
    } catch (error) {
        console.error('Erreur dans fetchAllVehicles:', error)
        throw error
    }
}

// Fonction pour créer un véhicule
export const createVehicle = async (formData: FormData): Promise<BaseResponse<ListesVehicle>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                // Pas besoin de 'Content-Type': multipart/form-data → géré automatiquement par FormData
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la création du véhicule :", error);
        throw error;
    }
};

// Fonction pour modifier un véhicule existant
export const updateVehicle = async (vehicleId: string, formData: FormData): Promise<BaseResponse<ListesVehicle>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles/${encodeURIComponent(vehicleId)}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
                // multipart/form-data → ne surtout pas définir le Content-Type manuellement
            },
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la mise à jour du véhicule :", error);
        throw error;
    }
};

// Fonction pour passer une commande
export const createOrder = async (orderId: string, userId: string | null): Promise<any> => {
    try {
        const response = await fetch(`${getBaseUrl()}/order/create/${orderId}?userId=${userId}`, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
            body: null, // équivalent à `-d ''` dans curl
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        throw error;
    }
};

// Fonction pour récupérer tous les services
export const getAllServices = async ( page: number = 1,limit: number = 10): Promise<BaseResponse<Pagination<Service>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/services?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Erreur lors de la récupération des services :', error)
        throw error
    }
}

// Fonction pour récupérer les véhicules avec leurs conducteurs
export const getVehiclesWithDrivers = async (page: number = 1,limit: number = 10): Promise<BaseResponse<Pagination<VehicleWithDrivers>>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles/with-drivers/all?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }

        return await response.json()
        
    } catch (error) {
        console.error('Erreur lors de la récupération des services :', error)
        throw error
    }
}


// Liste des véhicules d’un partenaire (sans pagination)
export const getAllVehiclesByPartner = async (): Promise<BaseResponse<ListesVehicle[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/vehicles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur dans fetchAllVehicles:', error)
        throw error
    }
}
// Liste de tous les conducteurs d’un partenaire (sans pagination)
export const getAlldriversByPartner = async (): Promise<BaseResponse<DriverInfo[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/drivers/by-partner/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
            },
        })
        return await response.json()
    } catch (error) {
        console.error('Erreur dans fetchAllVehicles:', error)
        throw error
    }
}

// ✅ PATCH /api/auth/vehicle/{vehicleId}/assign-driver/{driverId}
export const assignDriver = async (vehicleId: string, driverId: string): Promise<BaseResponse<any>> => {

    const res = await fetch(`${getBaseUrl()}/auth/vehicle/${vehicleId}/assign-driver/${driverId}`, {
        method: 'PATCH',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to assign driver: ${res.statusText}`);
    }

    return await res.json();
};


// ✅ PATCH /api/auth/vehicle/{vehicleId}/remove-driver/{driverId}
export const removeDriver = async (vehicleId: string, driverId: string): Promise<BaseResponse<any>> => {

    const res = await fetch(`${getBaseUrl()}/auth/vehicle/${vehicleId}/remove-driver/${driverId}`, {
        method: 'PATCH',
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to assign driver: ${res.statusText}`);
    }

    return await res.json();
};
