
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { useIMEIChecker } from '@/hooks/useIMEIChecker';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const IMEIChecker = () => {
  const [imei, setImei] = useState('');
  const { checkIMEI, isLoading, result, error, reset } = useIMEIChecker();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imei.trim()) {
      toast({
        title: t("imei.error"),
        description: t("imei.errorEnterImei"),
        variant: "destructive"
      });
      return;
    }

    // Basic IMEI validation (should be 15 digits)
    const cleanImei = imei.replace(/\s+/g, '');
    if (!/^\d{15}$/.test(cleanImei)) {
      toast({
        title: t("imei.errorInvalidImeiDesc"),
        description: t("imei.errorInvalidImei"),
        variant: "destructive"
      });
      return;
    }

    await checkIMEI(cleanImei);
  };

  const handleReset = () => {
    setImei('');
    reset();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">{t("imei.title")}</CardTitle>
        </div>
        <p className="text-muted-foreground">
          {t("imei.subtitle")}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="imei" className="block text-sm font-medium mb-2">
              {t("imei.enterImei")}
            </label>
            <Input
              id="imei"
              type="text"
              placeholder={t("imei.placeholder")}
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              maxLength={17} // Allow for spaces
              className="text-center text-lg font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {t("imei.findImei")}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Search className="mr-2 h-4 w-4 animate-spin" />
                  {t("imei.checking")}
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  {t("imei.checkImei")}
                </>
              )}
            </Button>
            
            {(result || error) && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
              >
                {t("imei.reset")}
              </Button>
            )}
          </div>
        </form>

        {/* Results */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{t("imei.error")}</span>
              </div>
              <p className="mt-2 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-3">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{t("imei.results")}</span>
              </div>
              <div className="whitespace-pre-wrap text-sm font-mono bg-background p-4 rounded border">
                {result}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">{t("imei.whatIsImei")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("imei.imeiDescription")}
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold mb-2">{t("imei.features.secure")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("imei.features.secureDesc")}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">{t("imei.features.instant")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("imei.features.instantDesc")}
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">💯</div>
            <h3 className="font-semibold mb-2">{t("imei.features.free")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("imei.features.freeDesc")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IMEIChecker;
