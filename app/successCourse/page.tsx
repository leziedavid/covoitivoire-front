'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function CourseSuccessPage() {
    const searchParams = useSearchParams();
    const courseId = searchParams.get('ordersNumber') || 'N/A';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 ">
            <div className="w-full max-w-md p-6 mx-4 text-center bg-white rounded-xl shadow-md">
                {/* Success Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>

                {/* Title */}
                <h1 className="mb-2 text-2xl font-bold text-green-600">Course confirmée !</h1>

                {/* Message */}
                <p className="mb-4 text-sm text-gray-600">Votre course a bien été enregistrée.</p>

                <div className="p-4 mb-4 rounded-md bg-blue-50">
                    <p className="text-sm font-medium text-blue-700">
                        ID de la course : <span className="font-bold text-blue-900">{courseId}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Le conducteur sera bientôt assigné.</p>
                </div>

                {/* Bouton retour */}
                <a
                    href="/courses"
                    className="inline-block px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                    Retour à mes courses
                </a>
            </div>
        </div>
    );
}
