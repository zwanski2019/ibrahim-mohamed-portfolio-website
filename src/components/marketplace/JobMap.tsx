
import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign } from "lucide-react";
import { JobPost } from "@/types/marketplace";
import { TUNISIA_CENTER, TUNISIA_CITIES } from "@/utils/geocoding";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiNERjQ0NEEiLz4KPHBhdGggZD0iTTEyLjUgNDFMMCAyNUgyNUwxMi41IDQxWiIgZmlsbD0iI0RGNDQ0QSIvPgo8L3N2Zz4K',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiNERjQ0NEEiLz4KPHBhdGggZD0iTTEyLjUgNDFMMCAyNUgyNUwxMi41IDQxWiIgZmlsbD0iI0RGNDQ0QSIvPgo8L3N2Zz4K',
  shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwLjUiIGN5PSIyMC41IiByeD0iMjAuNSIgcnk9IjIwLjUiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4K',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface JobMapProps {
  jobs: (JobPost & {
    employer: {
      id: string;
      full_name: string;
      avatar_url: string | null;
      rating: number | null;
      verified: boolean;
    };
  })[];
  onJobSelect?: (job: JobPost) => void;
}

export const JobMap = ({ jobs = [], onJobSelect }: JobMapProps) => {
  // Ensure jobs is always an array and filter jobs with valid coordinates
  const jobsWithCoordinates = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    return jobs.filter(job => 
      job && 
      typeof job.latitude === 'number' && 
      typeof job.longitude === 'number' &&
      !isNaN(job.latitude) && 
      !isNaN(job.longitude)
    );
  }, [jobs]);

  const hasJobs = Array.isArray(jobs) && jobs.length > 0;

  // Calculate center point with error handling
  const mapConfig = useMemo(() => {
    let centerLat = TUNISIA_CENTER.latitude;
    let centerLng = TUNISIA_CENTER.longitude;
    let zoomLevel = 6; // Country view

    if (jobsWithCoordinates.length > 0) {
      try {
        centerLat = jobsWithCoordinates.reduce((sum, job) => sum + job.latitude!, 0) / jobsWithCoordinates.length;
        centerLng = jobsWithCoordinates.reduce((sum, job) => sum + job.longitude!, 0) / jobsWithCoordinates.length;
        
        // Validate calculated center
        if (isNaN(centerLat) || isNaN(centerLng)) {
          centerLat = TUNISIA_CENTER.latitude;
          centerLng = TUNISIA_CENTER.longitude;
        } else {
          zoomLevel = 10; // City view
        }
      } catch (error) {
        console.error('Error calculating map center:', error);
        centerLat = TUNISIA_CENTER.latitude;
        centerLng = TUNISIA_CENTER.longitude;
      }
    }

    return { centerLat, centerLng, zoomLevel };
  }, [jobsWithCoordinates]);

  const formatSalary = (job: JobPost) => {
    if (!job.salary_min && !job.salary_max) return null;
    const min = job.salary_min ? `${job.salary_min} TND` : '';
    const max = job.salary_max ? `${job.salary_max} TND` : '';
    const range = min && max ? `${min} - ${max}` : min || max;
    return `${range} / ${job.salary_type}`;
  };

  // Don't render if we don't have valid config
  if (!mapConfig.centerLat || !mapConfig.centerLng || isNaN(mapConfig.centerLat) || isNaN(mapConfig.centerLng)) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardContent>
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Map temporarily unavailable</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96 relative">
      {!hasJobs && (
        <div className="absolute top-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>No jobs available - showing Tunisia</span>
          </div>
        </div>
      )}
      {jobsWithCoordinates.length === 0 && hasJobs && (
        <div className="absolute top-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{jobs.length} jobs without map coordinates</span>
          </div>
        </div>
      )}
      
      <MapContainer
        key={`${mapConfig.centerLat}-${mapConfig.centerLng}-${mapConfig.zoomLevel}`}
        center={[mapConfig.centerLat, mapConfig.centerLng]}
        zoom={mapConfig.zoomLevel}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Show major cities when no jobs have coordinates */}
        {jobsWithCoordinates.length === 0 && TUNISIA_CITIES.map((city) => (
          <Marker
            key={city.name}
            position={[city.latitude, city.longitude]}
            icon={L.divIcon({
              className: 'city-marker',
              html: '<div style="background: #8B5CF6; border: 2px solid white; border-radius: 50%; width: 12px; height: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
              iconSize: [12, 12],
              iconAnchor: [6, 6]
            })}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-sm">{city.name}</h3>
                <p className="text-xs text-muted-foreground">Major city in Tunisia</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Show actual jobs with coordinates */}
        {jobsWithCoordinates.map((job) => (
          <Marker
            key={job.id}
            position={[job.latitude!, job.longitude!]}
          >
            <Popup className="w-64">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm line-clamp-2">{job.title}</h3>
                  <Badge 
                    variant={job.urgency === 'high' ? 'destructive' : 
                           job.urgency === 'medium' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {job.urgency}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {job.description}
                </p>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                  
                  {formatSalary(job) && (
                    <div className="flex items-center gap-1 text-xs">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-medium text-green-600">{formatSalary(job)}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">{job.category}</Badge>
                  <Badge variant="outline" className="text-xs">{job.job_type}</Badge>
                </div>

                <Button 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => onJobSelect?.(job)}
                >
                  View Details
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Card>
  );
};
